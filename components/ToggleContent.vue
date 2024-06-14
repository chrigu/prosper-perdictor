<script setup lang="ts">
export interface Props {
  contentName?: string;
  showInitially?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showInitially: false,
});

const showContent = ref(props.showInitially);
</script>

<template>
  <Button
    :label="showContent ? `Hide ${contentName}` : `Show ${contentName}`"
    @click="showContent = !showContent"
  />
  <slot v-if="showContent"></slot>
</template>
