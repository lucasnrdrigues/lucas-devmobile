import React, { useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Alert, Keyboard } from 'react-native';
import {
  Appbar, FAB, Card, Paragraph, Dialog, Portal,
  Button, Snackbar, TextInput, HelperText, Menu, Title
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getData, storeData } from '../services/storage';
import { useFocusEffect } from '@react-navigation/native';

const schema = yup.object({
  title: yup.string().required('Título obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  date: yup
    .string()
    .required('Data obrigatória')
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/,
      'Data inválida. Use DD/MM/AAAA'
    ),
  category: yup.string().required('Categoria obrigatória'),
  priority: yup.string().required('Prioridade obrigatória'),
});

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [priorityMenuVisible, setPriorityMenuVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, formState: { errors } } =
    useForm({ resolver: yupResolver(schema) });

  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadCategories();
    }, [])
  );

  const loadTasks = async () => {
    const data = await getData('tasks');
    const sorted = (data || []).sort(compareDates);
    setTasks(sorted);
  };

  const loadCategories = async () => {
    const data = await getData('categories');
    setCategories(data || []);
  };

  const compareDates = (a, b) => {
    const [dA, mA, yA] = a.date.split('/');
    const [dB, mB, yB] = b.date.split('/');
    const dateA = new Date(`${yA}-${mA}-${dA}`);
    const dateB = new Date(`${yB}-${mB}-${dB}`);
    return dateA - dateB;
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#000';
  };

  const onSubmit = async (data) => {
    const id = editingTask ? editingTask.id : Date.now();
    const updated = editingTask
      ? tasks.map(t => (t.id === editingTask.id ? { ...data, id } : t))
      : [...tasks, { ...data, id }];

    const sorted = updated.sort(compareDates);
    setTasks(sorted);
    await storeData('tasks', sorted);
    setSnackbar({ visible: true, message: editingTask ? 'Tarefa atualizada!' : 'Tarefa adicionada!' });
    closeDialog();
  };

  const handleDelete = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          const filtered = tasks.filter(t => t.id !== id);
          setTasks(filtered);
          await storeData('tasks', filtered);
          setSnackbar({ visible: true, message: 'Tarefa excluída!' });
        },
      },
    ]);
  };

  const openDialog = (task = null) => {
    setVisible(true);
    if (task) {
      setEditingTask(task);
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('date', task.date);
      setValue('category', task.category);
      setValue('priority', task.priority);
    } else {
      reset();
      setEditingTask(null);
    }
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const closeDialog = () => {
    setVisible(false);
    setEditingTask(null);
    reset();
    Keyboard.dismiss();
  };

  const handleDateInput = (text, onChange) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    onChange(formatted);
  };

  return (
    <View style={styles.page}>

      <ScrollView contentContainerStyle={styles.container}>
        {tasks.length === 0 ? (
          <Paragraph style={styles.empty}>Nenhuma tarefa cadastrada.</Paragraph>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>{task.title}</Title>
                <Paragraph style={{ color: getCategoryColor(task.category), fontWeight: 'bold' }}>
                  📂 Categoria: {task.category}
                </Paragraph>
                <Paragraph style={styles.text}>📝 {task.description}</Paragraph>
                <Paragraph style={styles.text}>📅 Data: {task.date}</Paragraph>
                <Paragraph style={styles.text}>⭐ Prioridade: {task.priority}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: 'flex-end' }}>
                <Button onPress={() => openDialog(task)} textColor="#6200ee">
                  Editar
                </Button>
                <Button
                  onPress={() => handleDelete(task.id)}
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
          <Dialog.Title>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <Dialog.Content>

                {/** Título */}
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Título"
                      value={value}
                      onChangeText={onChange}
                      error={!!errors.title}
                      ref={titleRef}
                      returnKeyType="next"
                      onSubmitEditing={() => descRef.current?.focus()}
                      style={styles.input}
                    />
                  )}
                />
                {errors.title && <HelperText type="error">{errors.title.message}</HelperText>}

                {/** Descrição */}
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Descrição"
                      value={value}
                      onChangeText={onChange}
                      error={!!errors.description}
                      ref={descRef}
                      returnKeyType="next"
                      onSubmitEditing={() => dateRef.current?.focus()}
                      style={styles.input}
                    />
                  )}
                />
                {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}

                {/** Data */}
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Data (DD/MM/AAAA)"
                      value={value}
                      onChangeText={(text) => handleDateInput(text, onChange)}
                      error={!!errors.date}
                      ref={dateRef}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      style={styles.input}
                    />
                  )}
                />
                {errors.date && <HelperText type="error">{errors.date.message}</HelperText>}

                {/** Categoria */}
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

                {/** Prioridade */}
                <Controller
                  control={control}
                  name="priority"
                  render={({ field: { onChange, value } }) => (
                    <Menu
                      visible={priorityMenuVisible}
                      onDismiss={() => setPriorityMenuVisible(false)}
                      anchor={
                        <TextInput
                          label="Prioridade"
                          value={value}
                          onFocus={() => setPriorityMenuVisible(true)}
                          showSoftInputOnFocus={false}
                          style={styles.input}
                          error={!!errors.priority}
                          right={<TextInput.Icon icon="menu-down" />}
                        />
                      }
                    >
                      {['Baixa', 'Média', 'Alta'].map((level) => (
                        <Menu.Item
                          key={level}
                          title={level}
                          onPress={() => {
                            onChange(level);
                            setPriorityMenuVisible(false);
                          }}
                        />
                      ))}
                    </Menu>
                  )}
                />
                {errors.priority && <HelperText type="error">{errors.priority.message}</HelperText>}

              </Dialog.Content>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={handleSubmit(onSubmit)}>
              {editingTask ? 'Atualizar' : 'Salvar'}
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
