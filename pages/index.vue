<script setup lang="ts">

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import MonthData from '~/components/MonthData.vue';

const incomeStore = useIncomeStore();


</script>
<template>
  <div>
    <!-- This page correctly has only one single root element -->
      <h1>Finance</h1>
      <Accordion :multiple="true" :activeIndex="[0]">
        <AccordionTab header="Income">
              <div class="m-0 grid grid-cols-12 gap-4">
                <MonthData :title="'January'" :month="1" :incomes="incomeStore.incomes[0]" @add-income="incomeStore.addIncome"/>
                <div>February</div>
                <div>March</div>
                <div>April</div>
                <div>May</div>
                <div>June</div>
                <div>July</div>
                <div>August</div>
                <div>September</div>
                <div>October</div>
                <div>November</div>
                <div>December</div>
              </div>
        </AccordionTab>
        <AccordionTab header="Expenditure">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </AccordionTab>
        <AccordionTab header="Accounts">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </AccordionTab>
      </Accordion>
  </div>
</template>