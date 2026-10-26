<template>
    <template v-if="parcelConfigRef">
        <Parcel v-on:parcelMounted="parcelMounted()" v-on:parcelUpdated="parcelUpdated()"
            v-on:parcelError="(err: any) => parcelError(err)" :config="parcelConfigRef" :mountParcel="mountParcel"
            :wrapWith="wrapWith" :wrapClass="wrapClass" :wrapStyle="wrapStyle" :parcelProps="getParcelProps()" />
    </template>
</template>

<script setup lang="ts">
import Parcel from 'single-spa-vue/parcel'
import { mountRootParcel } from 'single-spa'
import { onBeforeMount, ref } from 'vue'
import { dynamicImport } from '../utils/dynamicImport'

const parcelConfigRef = ref<Promise<any> | null>(null)

const props = defineProps<{
    appName: string
}>()

onBeforeMount(() => {
    parcelConfigRef.value = dynamicImport(props.appName).then(ns => {
        console.log('[ParcelWrapper] Loaded remote module:', props.appName, ns);
        console.log('[ParcelWrapper] Available exports:', Object.keys(ns));
        
        // Try different export patterns
        const config = ns.Widget || ns.default || ns;
        
        // Validate parcel config
        if (config && typeof config === 'object') {
            console.log('[ParcelWrapper] Parcel config keys:', Object.keys(config));
            
            if (typeof config.mount === 'function' && typeof config.unmount === 'function') {
                console.log('[ParcelWrapper] Valid parcel config found');
                return config;
            } else {
                console.error('[ParcelWrapper] Invalid parcel config - missing mount/unmount functions');
                console.error('[ParcelWrapper] Config:', config);
            }
        }
        
        return config;
    })
})

const mountParcel = mountRootParcel
const wrapWith = 'div'
const wrapClass = 'bg-red'
const wrapStyle = {}

function getParcelProps() {
    return { text: `Hello world` }
}

function parcelMounted() {
    console.log('parcel mounted')
}

function parcelUpdated() {
    console.log('parcel updated')
}

function parcelError(err: any) {
    console.error(err)
}
</script>