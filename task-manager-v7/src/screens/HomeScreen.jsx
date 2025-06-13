import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, } from 'react-native';
import {
  Card, Title, Paragraph, Snackbar, List,
} from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { getData } from '../services/storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  // Estados que armazenam as tarefas agrupadas
  const [tasksByDate, setTasksByDate] = useState({});
  const [tasksByMonth, setTasksByMonth] = useState({});
  const [tasksByCategory, setTasksByCategory] = useState({});
  const [tasksByYear, setTasksByYear] = useState({});

  // Estados para exibição de mensagens e reflexão do dia
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [reflection, setReflection] = useState(null);

  // Quando a tela ganha foco, carrega as tarefas e a reflexão
  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadReflection();
    }, [])
  );

  // Função responsável por carregar e agrupar as tarefas do armazenamento local
  const loadTasks = async () => {
    const tasks = await getData('tasks') || [];

    const countsByDate = {};
    const countsByMonth = {};
    const countsByCategory = {};
    const countsByYear = {};

    // Agrupa tarefas por data, mês, categoria e ano
    tasks.forEach(t => {
      countsByDate[t.date] = (countsByDate[t.date] || 0) + 1;

      const [d, m, y] = t.date.split('/');
      const month = `${m}/${y}`;
      const year = y;

      countsByMonth[month] = (countsByMonth[month] || 0) + 1;
      countsByCategory[t.category] = (countsByCategory[t.category] || 0) + 1;
      countsByYear[year] = (countsByYear[year] || 0) + 1;
    });

    // Ordena as datas cronologicamente
    const sortedDates = Object.keys(countsByDate).sort((a, b) => {
      const [dA, mA, yA] = a.split('/');
      const [dB, mB, yB] = b.split('/');
      return new Date(`${yA}-${mA}-${dA}`) - new Date(`${yB}-${mB}-${dB}`);
    });

    const orderedByDate = {};
    sortedDates.forEach(date => {
      orderedByDate[date] = countsByDate[date];
    });

    // Ordena os meses cronologicamente
    const sortedMonths = Object.keys(countsByMonth).sort((a, b) => {
      const [mA, yA] = a.split('/');
      const [mB, yB] = b.split('/');
      return new Date(`${yA}-${mA}-01`) - new Date(`${yB}-${mB}-01`);
    });

    const orderedByMonth = {};
    sortedMonths.forEach(month => {
      orderedByMonth[month] = countsByMonth[month];
    });

    // Ordena os anos em ordem crescente
    const sortedYears = Object.keys(countsByYear).sort((a, b) => a - b);
    const orderedByYear = {};
    sortedYears.forEach(year => {
      orderedByYear[year] = countsByYear[year];
    });

    // Atualiza os estados com os dados processados
    setTasksByDate(orderedByDate);
    setTasksByMonth(orderedByMonth);
    setTasksByCategory(countsByCategory);
    setTasksByYear(orderedByYear);
  };

  // Função que busca a reflexão do dia de uma API externa
  const loadReflection = async () => {
    try {
      const res = await axios.get('https://zenquotes.io/api/today');
      if (res.data && res.data.length > 0) {
        setReflection(res.data[0]);
      }
    } catch (error) {
      setSnackbarMessage('Erro ao carregar reflexão do dia.');
      setSnackbarVisible(true);
    }
  };

  // Prepara os dados para o gráfico de pizza (tarefas por categoria)
  const pieData = Object.entries(tasksByCategory).map(([key, value], index) => ({
    name: key,
    population: value,
    color: ['#6200ee', '#03dac5', '#ff0266', '#ffab00', '#9c27b0'][index % 5],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Reflexão do Dia */}
        <Title style={styles.sectionTitle}>🌅 Reflexão do Dia</Title>
        {reflection ? (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.quote}>“{reflection.q}”</Paragraph>
              <Paragraph style={styles.author}>— {reflection.a}</Paragraph>
            </Card.Content>
          </Card>
        ) : (
          <Paragraph style={styles.empty}>Nenhuma reflexão disponível.</Paragraph>
        )}

        {/* Gráfico de tarefas por mês */}
        <Title style={styles.sectionTitle}>📊 Tarefas por Mês</Title>
        {Object.keys(tasksByMonth).length > 0 && (
          <BarChart
            data={{
              labels: Object.keys(tasksByMonth),
              datasets: [{ data: Object.values(tasksByMonth) }],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            fromZero
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}

        {/* Gráfico de tarefas por categoria */}
        <Title style={styles.sectionTitle}>📂 Tarefas por Categoria</Title>
        {Object.keys(tasksByCategory).length > 0 && (
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        )}

        {/* Gráfico de tarefas por ano */}
        <Title style={styles.sectionTitle}>📅 Tarefas por Ano</Title>
        {Object.keys(tasksByYear).length > 0 && (
          <BarChart
            data={{
              labels: Object.keys(tasksByYear),
              datasets: [{ data: Object.values(tasksByYear) }],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            fromZero
            chartConfig={chartConfig}
            style={styles.chart}
          />
        )}

        {/* Lista de tarefas por data */}
        <Title style={styles.sectionTitle}>🗓️ Tarefas por Data</Title>
        {Object.keys(tasksByDate).length === 0 ? (
          <Paragraph style={styles.empty}>Sem tarefas registradas.</Paragraph>
        ) : (
          Object.entries(tasksByDate).map(([date, count]) => (
            <List.Item
              key={date}
              title={date}
              description={`${count} tarefa${count > 1 ? 's' : ''}`}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
          ))
        )}
      </ScrollView>

      {/* Exibição de mensagens temporárias (ex: erro ao buscar reflexão) */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

// Configuração visual dos gráficos
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: '#6200ee',
  },
};

// Estilos visuais da tela
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
  quote: {
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 8,
  },
  author: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#6200ee',
  },
  empty: {
    color: '#777',
    marginBottom: 8,
  },
  chart: {
    borderRadius: 10,
    marginBottom: 16,
  },
});
