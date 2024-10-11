<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.tools')"
    width="762"
    height="auto"
  >
    <div class="analysisInform">
      <div class="analysisInform-card">
        <div class="content">
          <div class="info">
            <div class="con">
              <div class="left">
                <vxe-card :title="$t('step.storageWellbore')">
                  <n-tree
                    block-line
                    :data="WellboreData"
                    :default-selected-keys="wellkey"
                  />
                </vxe-card>
              </div>
              <div class="right">
                <vxe-card :title="$t('step.modelWell')">
                  <n-tree
                    block-line
                    :data="Modeldata"
                    :default-selected-keys="modelkey"
                    :node-props="nodeProps"
                  />
                </vxe-card>
              </div>
            </div>
            <div class="con">
              <div class="left">
                <vxe-card :title="$t('step.modelReservoir')">
                  <n-tree
                    block-line
                    :data="Reservoirdata"
                    :default-selected-keys="reservoirkey"
                  />
                </vxe-card>
              </div>
              <div class="right">
                <vxe-card :title="$t('step.modelBoundary')">
                  <n-tree
                    block-line
                    :data="Boundarydata"
                    :default-selected-keys="boundarykey"
                  />
                </vxe-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="analysisInform-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { TreeOption } from "naive-ui";
const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const Wellbore = [
  {
    key: "07a3260-494098b9-2b37e7f0dc4c",
    parentId: null,
    label: t("step.none")
  },
  {
    key: "07a73260-5767-4940-98b9",
    parentId: null,
    label: t("step.constant")
  },
  {
    key: "07a73260-40-98b9-2b37e7f0dc4c",
    parentId: null,
    label: t("step.changing")
  }
];
const Wellbore2 = [
  {
    key: "07a3260-494098b9-2b37e7f0dc4c",
    parentId: null,
    label: t("step.none")
  },
  {
    key: "07a73260-5767-4940-98b9",
    parentId: null,
    label: t("step.constant")
  }
];
const Model = [
  {
    key: "0gf7",
    parentId: null,
    label: t("step.radiusFinite")
  },
  {
    key: "dfga7",
    parentId: null,
    label: t("step.conductivityInfinite")
  },
  {
    key: "hjgfd2",
    parentId: null,
    label: t("step.conductivityFinit")
  },
  {
    key: "6fghj0",
    parentId: null,
    label: t("step.entryLimited")
  },
  {
    key: "40jkl",
    parentId: null,
    label: t("step.horizontal")
  },
  {
    key: "8kl;b",
    parentId: null,
    label: t("step.horizontalFractured")
  },
  {
    key: "98ghjkmnbvnf",
    parentId: null,
    label: t("step.horizontalSRVB")
  },
  {
    key: "bhgfd9",
    parentId: null,
    label: t("step.horizontalTrilinear")
  }
];
const Reservoir = [
  {
    key: "a940c",
    parentId: null,
    label: t("step.Homogeneous")
  },
  {
    key: "b9hjkl",
    parentId: null,
    label: t("step.porosityPSS")
  },
  {
    key: "f0",
    parentId: null,
    label: t("step.porositytransient")
  },
  {
    key: "d4c",
    parentId: null,
    label: t("step.compositeRadial")
  },
  {
    key: "cdfghj",
    parentId: null,
    label: t("step.compositeLinear")
  }
];
const Boundary = [
  {
    key: "07a3269-2b37e7f0dc4c",
    parentId: null,
    label: t("step.infinite")
  },
  {
    key: "07a9",
    parentId: null,
    label: "Single fault"
  },
  {
    key: "07a73260-f0dc4c",
    parentId: null,
    label: t("step.faultLeaky")
  },
  {
    key: "0b37e7f0dc4c",
    parentId: null,
    label: t("step.faultsIntersecting")
  },
  {
    key: "07a98b9",
    parentId: null,
    label: t("step.channel")
  },
  {
    key: "e7c4c",
    parentId: null,
    label: t("step.closed")
  },
  {
    key: "07a732607f0dc4c",
    parentId: null,
    label: t("step.rectanglecentered")
  },
  {
    key: "098b9-2b37e7f0dc4c",
    parentId: null,
    label: t("step.rectangle")
  },
  {
    key: "07a7320-98b9",
    parentId: null,
    label: t("step.constantWeak")
  },
  {
    key: "07-97f0dc4c",
    parentId: null,
    label: t("step.constantStrong")
  }
];

const WellboreData = ref(Wellbore);
const Modeldata = Model;
const Reservoirdata = ref(Reservoir);
const Boundarydata = ref(Boundary);
const wellkey = ref("07a3260-494098b9-2b37e7f0dc4c");
const modelkey = ref("0gf7");
const reservoirkey = ref("a940c");
const boundarykey = ref("07a3269-2b37e7f0dc4c");
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      // console.log(`[Click] ${option.label}`);
      if (option.key === "bhgfd9" || option.key === "98ghjkmnbvnf") {
        Reservoirdata.value = [];
        Boundarydata.value = [];
        WellboreData.value = Wellbore2;
      } else {
        Reservoirdata.value = Reservoir;
        Boundarydata.value = Boundary;
        WellboreData.value = Wellbore;
      }
    }
  };
};
</script>

<style lang="scss" scoped>
.analysisInform {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 520px;
      border: 1px solid $dialogBorder;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      height: 97%;
      .info {
        width: 96%;
        height: 100%;
        margin: 2%;
      }
      .con {
        height: 50%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .left,
        .right {
          width: calc(50% - 10px);
          height: 100%;
        }
      }
    }
  }
  &-button {
    display: inline-block;
    padding: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
::v-deep .n-tree .n-tree-node-content {
  min-height: 16px;
  box-sizing: border-box;
  line-height: 16px;
  vertical-align: bottom;
  padding: 0;
}
::v-deep .n-tree .n-tree-node-wrapper {
  box-sizing: border-box;
  padding: 0;
  height: 16px;
  line-height: 16px;
  font-size: 16px * 0.8;
}
::v-deep .n-tree .n-tree-node {
  height: 16px;
}
::v-deep .vxe-card {
  height: 100%;
}
</style>
