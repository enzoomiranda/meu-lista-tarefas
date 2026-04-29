/**
 * app/index.tsx — Tela Principal (Lista de Tarefas)
 *
 * No Expo Router, o arquivo `app/index.tsx` é automaticamente mapeado
 * para a rota raiz "/" — a primeira tela exibida ao abrir o app.
 *
 * Responsabilidades desta tela:
 * - Exibir a lista de tarefas com a barra de filtros
 * - Recarregar automaticamente ao ganhar foco (via useFocusEffect no hook)
 * - Navegar para a tela de formulário ao pressionar o FAB
 *
 * O que é FAB (Floating Action Button)?
 * ──────────────────────────────────────
 * Um botão circular flutuante, geralmente no canto inferior direito.
 * É o padrão de Material Design para a ação principal de uma tela.
 * Aqui, o FAB abre o formulário para adicionar uma nova tarefa.
 *
 * Componentes React Native usados:
 * ─────────────────────────────────
 * - `FlatList`: renderiza listas de forma eficiente com virtualização.
 *   Diferente do `ScrollView + map()`, o FlatList só renderiza os itens
 *   visíveis na tela, o que é essencial para listas longas.
 *
 * - `ActivityIndicator`: spinner de carregamento nativo do dispositivo.
 *
 * - `SafeAreaView`: (via contentStyle no layout) garante que o conteúdo
 *   não fica atrás do notch ou canto arredondado em iPhones modernos.
 */

import React, { Activity } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useTasks } from '../src/hooks/useTasks';
import { TaskItem } from '../src/components/TaskItem';
import { FilterBar } from '../src/components/FilterBar';
import { EmptyState } from '../src/components/EmptyState';

export default function Index() {
    const router = useRouter();

    // Desestrutura tudo que o hook expõe — veja src/hooks/useTasks.ts
    const {
        tasks,
        allTasksCount,
        pendingCount,
        completedCount,
        filter,
        loading,
        setFilter,
        toggleTask,
        removeTask,
    } = useTasks();

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center bg-gray-50'>
                <ActivityIndicator size='large' color='#4f46e5' />
                <Text className='mt-3 text-gray-500 text-sm'>
                    Carregando ...
                </Text>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-gray-50 relative'>
            <FilterBar
                activeFilter={filter}
                allCount={allTasksCount}
                pendingCount={pendingCount}
                completedCount={completedCount}
                onFilterChange={setFilter}
            />
            <FlatList
                data={tasks}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggle={toggleTask} onDelete={removeTask} />
                )}
                ListEmptyComponent={<EmptyState filter={filter} />}
                contentContainerStyle={
                    tasks.length === 0 ? { flexGrow: 1 } : { paddingBottom: 100, paddingVertical: 8 }
                }
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                onPress={() => router.push('/form')}
                className='absolute bottom-8 right-6 w-16 h-16 bg-indigo-600- rounded-full items-center justify-center shadow-lg'
                accessibilityLabel='Adicionar nova tarefa'
                accessibilityRole='button'
            >
                <Text className='text-white text-4xl font-light'>+</Text>
            </TouchableOpacity>
        </View>
    )
}
