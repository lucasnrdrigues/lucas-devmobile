import * as yup from 'yup';

export const taskSchema = yup.object({
  title: yup.string().required('Título obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  date: yup.string().required('Data obrigatória'),
  category: yup.string().required('Categoria obrigatória'),
  priority: yup.string().required('Prioridade obrigatória'),
});
