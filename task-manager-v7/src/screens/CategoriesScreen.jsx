import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text } from 'react-native';
import {
  FAB, TextInput, Button, Card, Title, Paragraph, Dialog, Portal,
  Snackbar, Menu, HelperText
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storeData, getData } from '../services/storage';

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  color: yup.string().required('Cor obrigatória'),
});

const colorOptions = [
  { label: 'Vermelho', value: 'red' },
  { label: 'Azul', value: 'blue' },
  { label: 'Verde', value: 'green' },
  { label: 'Roxo', value: 'purple' },
  { label: 'Laranja', value: 'orange' },
  { label: 'Amarelo', value: 'gold' },
  { label: 'Rosa', value: 'pink' },
  { label: 'Preto', value: 'black' },
  { label: 'Cinza', value: 'gray' },
];

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const [colorMenuVisible, setColorMenuVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getData('categories');
    setCategories(data || []);
  };

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
  };

  const onSubmit = async (data) => {
    const newData = {
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      ...data,
    };
    const updated = editingCategory
      ? categories.map((item) => (item.id === editingCategory.id ? newData : item))
      : [...categories, newData];

    setCategories(updated);
    await storeData('categories', updated);
    showSnackbar(editingCategory ? 'Categoria atualizada!' : 'Categoria adicionada!');
    closeDialog();
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir esta categoria?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const filtered = categories.filter((item) => item.id !== id);
          setCategories(filtered);
          await storeData('categories', filtered);
          showSnackbar('Categoria excluída!');
        },
      },
    ]);
  };

  const openDialog = (category = null) => {
    setDialogVisible(true);
    if (category) {
      setEditingCategory(category);
      setValue('name', category.name);
      setValue('color', category.color);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setEditingCategory(null);
    reset();
    setColorMenuVisible(false);
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.sectionTitle}>📂 Categorias</Title>

        {categories.length === 0 ? (
          <Paragraph style={styles.empty}>Nenhuma categoria cadastrada.</Paragraph>
        ) : (
          categories.map((cat) => (
            <Card key={cat.id} style={styles.card}>
              <Card.Content>
                <Title style={[styles.title, { color: cat.color }]}>{cat.name}</Title>
                <Paragraph style={styles.text}>
                  🎨 Cor:{' '}
                  <Text style={{ color: cat.color, fontWeight: 'bold' }}>
                    {cat.color.charAt(0).toUpperCase() + cat.color.slice(1)}
                  </Text>
                </Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: 'flex-end' }}>
                <Button onPress={() => openDialog(cat)} textColor="#6200ee">
                  Editar
                </Button>
                <Button
                  onPress={() => handleDelete(cat.id)}
                  textColor="#fff"
                  style={{ backgroundColor: '#6200ee' }}
                >
                  Excluir
                </Button>
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB icon="plus" style={styles.fab} onPress={() => openDialog()} />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</Dialog.Title>
          <Dialog.Content>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Nome"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.name}
                  style={styles.input}
                />
              )}
            />
            {errors.name && <HelperText type="error">{errors.name.message}</HelperText>}

            <Controller
              control={control}
              name="color"
              render={({ field: { onChange, value } }) => (
                <Menu
                  visible={colorMenuVisible}
                  onDismiss={() => setColorMenuVisible(false)}
                  anchor={
                    <TextInput
                      label="Cor"
                      value={value}
                      onFocus={() => setColorMenuVisible(true)}
                      showSoftInputOnFocus={false}
                      style={styles.input}
                      error={!!errors.color}
                      right={<TextInput.Icon icon="menu-down" />}
                    />
                  }
                >
                  {colorOptions.map((opt) => (
                    <Menu.Item
                      key={opt.value}
                      title={opt.label}
                      onPress={() => {
                        onChange(opt.value);
                        setColorMenuVisible(false);
                      }}
                    />
                  ))}
                </Menu>
              )}
            />
            {errors.color && <HelperText type="error">{errors.color.message}</HelperText>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={handleSubmit(onSubmit)}>
              {editingCategory ? 'Atualizar' : 'Salvar'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={2500}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: '#6200ee',
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
  },
  empty: {
    color: '#777',
    marginBottom: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
  },
});
