<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
</script>
<template>
  <div>
    <Button label="Demo data" @click="addDemoData()" />
    <Accordion :multiple="true" :activeIndex="[0, 1, 2, 3]">
      <AccordionTab header="Planned transactions">
        <Transactions />
      </AccordionTab>
      <AccordionTab header="Accounts">
        <Accounts />
      </AccordionTab>
      <AccordionTab header="Taxes">
        <Taxes />
      </AccordionTab>
      <AccordionTab header="Outlook">
        <Predictions />
      </AccordionTab>
    </Accordion>
  </div>
</template>
