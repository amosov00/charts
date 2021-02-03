<template>
  <div id="chart-demo">
    <DxChart
        id="chart"
        :data-source="dataSource"
        palette="Violet"
    >
      <DxCommonSeriesSettings
          argument-field="country"
      />
      <DxSeries
          v-for="energy in energySources"
          :key="energy.value"
          :value-field="energy.value"
          :name="energy.name"
      />
      <DxMargin :bottom="20"/>
      <DxArgumentAxis
          :value-margins-enabled="false"
          discrete-axis-division-mode="crossLabels"
      >
        <DxGrid :visible="true"/>
      </DxArgumentAxis>
      <DxLegend
          vertical-alignment="bottom"
          horizontal-alignment="center"
          item-text-position="bottom"
      />
      <DxTooltip :enabled="true"/>
    </DxChart>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxSubtitle,
  DxTooltip
} from 'devextreme-vue/chart';
import DxSelectBox from 'devextreme-vue/select-box';

import service from './data.js';

export default {

  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxTooltip
  },

  data() {
    return {
      dataSource: service.getCountriesInfo(),
      energySources: service.getEnergySources(),
    };
  }
};
</script>
<style>
.option {
  margin-top: 10px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option > span {
  margin-right: 14px;
}

.option > .dx-widget {
  display: inline-block;
  vertical-align: middle;
}
</style>
