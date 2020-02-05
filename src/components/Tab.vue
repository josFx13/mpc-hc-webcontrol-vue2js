<template>
<li class="fx-tab" style="flex: 0 0 auto; " @click="$emit('fxseleccion')">
    <!--<a class="fx-tab" :class="{'fx-tab-selected':selected}" @click="$emit('fx-seleccion')">{{title}}</a>-->
    <p style="margin:0;padding:0">{{title}}</p>
</li>
</template>

<script>
export default {
    name: "fx-tab",
    props: {
        title: {
            type: String
        },
        value: {
            type: String,
            required: true
        },
        selected: {
            type: Boolean
        }
    },
    methods: {
        onClick: function _onClick(_ev) {
            //console.log(this.$emit);
            this.$emit("fxseleccion", _ev);
        }
    }
};
</script>

<style>
.fx-tab {
    /*font-family: "SF UI Display Semibold";*/
    text-decoration: none;
    background: white;
    display: inline-block;
    padding: 0.25rem 1.250rem;
    margin-bottom:-0.125rem; 
    color:red;
    border-radius: 0.5rem 0.5rem 0 0;
    border:solid 0.125rem black;
    transition: all 0.3s ease-in-out;
}
.fx-tab:hover {
    color: dimgrey;
    cursor: pointer;
}

.fx-tab-selected,.fx-tab-selected:hover {

    /*@apply -mb-px;*/
    border-bottom: solid 0.125rem white;
    border-top:solid 0.125rem black;
    /*@apply text-red-700;*/
    text-decoration: underline;
}


</style>
