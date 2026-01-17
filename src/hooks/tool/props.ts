import { ref } from "vue";

export function useProps(props: any, emit: any, syncLabel: string = "modelValue") {
    const _value = ref();

    watch(
        () => props[syncLabel],
        () => {
            _value.value = props[syncLabel]
        },
        {
            deep: true,
            immediate: true
        }
    )


    watch(
        () => _value,
        () => {
            emit("update:" + syncLabel, _value.value)
        },
        {
            deep: true,
            immediate: true
        }
    )

    return {
        _value,
    }

}