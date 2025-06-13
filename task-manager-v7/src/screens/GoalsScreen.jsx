import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Alert, Keyboard } from 'react-native';
import {
  Appbar, FAB, Card, Paragraph, Dialog, Portal,
  Button, Snackbar, TextInput, HelperText, Menu,
  Title, Checkbox
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getData, storeData } from '../services/storage';
import { useFocusEffect } from '@react-navigation/native';

const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  deadline: yup.number().typeError('Prazo obrigatório').required('Prazo obrigatório'),
  status: yup.string().required('Status obrigatório'),
  category: yup.string().required('Categoria obrigatória'),
});

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [statusMenuVisible, setStatusMenuVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  useFocusEffect(
    useCallback(() => {
      loadGoals();
      loadCategories();
    }, [])
  );

  const loadGoals = async () => {
    const data = await getData('goals');
    const sorted = (data || []).sort((a, b) => a.deadline - b.deadline);
    setGoals(sorted);
  };

  const loadCategories = async () => {
    const data = await getData('categories');
    setCategories(data || []);
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#000';
  };

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
  };

  const onSubmit = async (data) => {
    let newGoals;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    if (editingGoal) {
      newGoals = goals.map((item) =>
        item.id === editingGoal.id
          ? { ...data, id: editingGoal.id, createdAt: item.createdAt }
          : item
      );
      showSnackbar('Meta atualizada!');
    } else {
      const id = Date.now();
      newGoals = [...goals, { ...data, id, createdAt: formattedDate }];
      showSnackbar('Meta adicionada!');
    }

    const sorted = newGoals.sort((a, b) => a.deadline - b.deadline);
    setGoals(sorted);
    await storeData('goals', sorted);
    closeDialog();
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir esta meta?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const filtered = goals.filter((item) => item.id !== id);
          setGoals(filtered);
          await storeData('goals', filtered);
          showSnackbar('Meta excluída!');
        },
      },
    ]);
  };

  const openDialog = (goal = null) => {
    setVisible(true);
    if (goal) {
      setEditingGoal(goal);
      setValue('name', goal.name);
      setValue('description', goal.description);
      setValue('deadline', String(goal.deadline));
      setValue('status', goal.status);
      setValue('category', goal.category);
    } else {
      reset();
      setEditingGoal(null);
    }
  };

  const closeDialog = () => {
    setVisible(false);
    setEditingGoal(null);
    reset();
    Keyboard.dismiss();
  };

  const toggleCompleted = async (goal) => {
    const updatedGoals = goals.map(g =>
      g.id === goal.id ? {
        ...g,
        status: g.status === 'Finalizado' ? 'Em andamento' : 'Finalizado'
      } : g
    );
    setGoals(updatedGoals);
    await storeData('goals', updatedGoals);
  };

  return (
    <View style={styles.page}>

      <ScrollView contentContainerStyle={styles.container}>
        {goals.length === 0 ? (
          <Paragraph style={styles.empty}>Nenhuma meta cadastrada.</Paragraph>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <Title style={styles.title}>{goal.name}</Title>
                  <View style={styles.checkboxWrapper}>
                    <Checkbox
                      status={goal.status === 'Finalizado' ? 'checked' : 'unchecked'}
                      onPress={() => toggleCompleted(goal)}
                      color="#6200ee"
                    />
                  </View>
                </View>
                <Paragraph style={{
                  color: getCategoryColor(goal.category),
                  fontWeight: 'bold'
                }}>
                  📂 Categoria: {goal.category}
                </Paragraph>
                <Paragraph style={styles.text}>📝 {goal.description}</Paragraph>
                <Paragraph style={styles.text}>📅 Prazo em dias: {goal.deadline}</Paragraph>
                <Paragraph style={styles.text}>📌 Status: {goal.status}</Paragraph>
                <Paragraph style={styles.text}>📆 Criado em: {goal.createdAt}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: 'flex-end' }}>
                <Button onPress={() => openDialog(goal)} textColor="#6200ee">
                  Editar
                </Button>
                <Button
                  onPress={() => handleDelete(goal.id)}
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

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => openDialog()}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>{editingGoal ? 'Editar Meta' : 'Nova Meta'}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
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
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Descrição"
                      value={value}
                      onChangeText={onChange}
                      error={!!errors.description}
                      style={styles.input}
                    />
                  )}
                />
                {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}

                <Controller
                  control={control}
                  name="deadline"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Prazo (em dias)"
                      value={value}
                      onChangeText={onChange}
                      error={!!errors.deadline}
                      keyboardType="number-pad"
                      style={styles.input}
                    />
                  )}
                />
                {errors.deadline && <HelperText type="error">{errors.deadline.message}</HelperText>}

                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <Menu
                      visible={categoryMenuVisible}
                      onDismiss={() => setCategoryMenuVisible(false)}
                      anchor={
                        <TextInput
                          label="Categoria"
                          value={value}
                          onFocus={() => setCategoryMenuVisible(true)}
                          showSoftInputOnFocus={false}
                          style={styles.input}
                          error={!!errors.category}
                          right={<TextInput.Icon icon="menu-down" />}
                        />
                      }
                    >
                      {categories.length === 0 ? (
                        <Menu.Item title="Nenhuma categoria" />
                      ) : (
                        categories.map((cat) => (
                          <Menu.Item
                            key={cat.id}
                            title={cat.name}
                            onPress={() => {
                              onChange(cat.name);
                              setCategoryMenuVisible(false);
                            }}
                          />
                        ))
                      )}
                    </Menu>
                  )}
                />
                {errors.category && <HelperText type="error">{errors.category.message}</HelperText>}

                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <Menu
                      visible={statusMenuVisible}
                      onDismiss={() => setStatusMenuVisible(false)}
                      anchor={
                        <TextInput
                          label="Status"
                          value={value}
                          onFocus={() => setStatusMenuVisible(true)}
                          showSoftInputOnFocus={false}
                          style={styles.input}
                          error={!!errors.status}
                          right={<TextInput.Icon icon="menu-down" />}
                        />
                      }
                    >
                      {['Finalizado', 'Em andamento', 'Não finalizado'].map((status) => (
                        <Menu.Item
                          key={status}
                          title={status}
                          onPress={() => {
                            onChange(status);
                            setStatusMenuVisible(false);
                          }}
                        />
                      ))}
                    </Menu>
                  )}
                />
                {errors.status && <HelperText type="error">{errors.status.message}</HelperText>}

              </Dialog.Content>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={handleSubmit(onSubmit)}>
              {editingGoal ? 'Atualizar' : 'Salvar'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={3000}
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
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
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
