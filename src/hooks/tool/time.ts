export function useTimer() {
    //定义变量
    const isActive = ref(false);
    const timer = ref();

    /**
     * 开启一个定时器
     * @param time 定时器的时间
     * @param callback 执行方法
     */
    function startTimer(time: number, callback: Function) {
        if (!isActive.value) {
            isActive.value = true;
            timer.value = setInterval(function () {
                callback();
            }, time);
        }
    }

    /**
     * 停止一个定时器
     */
    function stopTimer() {
        console.log(timer.value)
        if (isActive.value) {
            isActive.value = false;
            clearInterval(timer.value);
        }
    }

    //关闭tab栏
    onUnmounted(async () => {
        stopTimer();
    });

    //离开页面
    onDeactivated(async () => {
        stopTimer();
    });


    return {
        startTimer,
        stopTimer,
    };
}


