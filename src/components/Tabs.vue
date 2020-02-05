<template>
<div>
    <ul class="fx-tabs">
        <tab v-for="(it,idx) in items" :key="it.value" :class="{'fx-tab-selected':selectedIndex == idx}" :title="it.title" :value="it.value" v-on:fxseleccion="onSelection(idx)"></tab>
        <!--<slot></slot>-->
    </ul>
    <slot name="scontent"></slot>
</div>
</template>

<script>
import tab from "./Tab";
export default {
    name: "fx-tabs",
    components: {
        tab
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        selectedIndex: {
            type: Number,
            required: false,
            default: 0
        }
    },
    methods: {
        onSelection: function _onSelection(index) {
            this.$emit('selection-changed', index);
            this.$emit('update:selectedIndex', index)
        }
    }
};
</script>

<style>
.fx-tabs{
    width:100%;
    display: flex;
    flex-flow: row nowrap;
    border:none;
    align-content: flex-end;
    align-items: flex-end;
    padding-left: 0.25rem;
    margin: 0;
    border-bottom: 0.125rem black solid;
    list-style: none;
    
}

</style>
