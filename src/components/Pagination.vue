<template>
  <div class="pagination">
    <label>
      <select v-model="limit" @change="selectLimit(limit)">
        <option v-for="l in limits" :value="l">{{ l }}</option>
      </select>
      <span>Itens por página</span>
    </label>
    <ol>
      <li v-for="page in pagesAmount">
        <button type="button" @click="selectPage(page)" :class="{ current: currentPage === (page - 1) }">{{ page }}</button>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

label {
  display: flex;
  align-items: center;
}

span {
  margin-left: 0.5rem;
}

select {
  background-color: rgba(233, 233, 233, 0.7);
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  min-width: 2.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  backdrop-filter: blur(5px);
}

ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin-right: 1rem;    
}

button {
  background-color: rgba(233, 233, 233, 0.7);
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  min-width: 2.5rem;
  border-radius: 2rem;
  cursor: pointer;
  backdrop-filter: blur(5px);

  &.current {
    color: rgb(38, 21, 196);
    background-color: rgba(85, 68, 241, 0.2);
  }
}
</style>

<script setup lang="ts">import { ref } from 'vue';
import { PaginationLimit } from '../enum/PaginationLimit';

type Props = {
  currentPage: number,
  pagesAmount: number
}

defineProps<Props>()

const limits = [PaginationLimit.SHORT, PaginationLimit.REGULAR, PaginationLimit.LONG]
const limit = ref(PaginationLimit.REGULAR)

const emit = defineEmits(['selectPage', 'selectLimit'])

const selectPage = (page: number) => void emit('selectPage', page)
const selectLimit = (limit: number) => void emit('selectLimit', limit)
</script>