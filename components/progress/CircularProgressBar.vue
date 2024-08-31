<template>
    <div class="progress-circle">
        <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" :stroke="circleBgColor" d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" :stroke="circleColor" :stroke-dasharray="progress + ', 100'" d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" :fill="circleColor" class="percentage">{{ progress }}%</text>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true,
            default: 0,
            validator: value => value >= 0 && value <= 100
        }
    },
    computed: {
        circleColor() {
            if (this.progress <= 40) {
                return '#ff0000'; 
            } else if (this.progress <= 60) {
                return '#ffff00'; 
            } else {
                return '#00ff00'; 
            }
        },
        circleBgColor() {
            if (this.progress <= 40) {
                return '#8c6f6f'; 
            } else if (this.progress <= 60) {
                return '#919170'; 
            } else {
                return '#425442'; 
            }
        }
    }
};
</script>

<style scoped>
.progress-circle {
    width: 100px;
    height: 100px;
}

.circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
}

.circle-bg {
    fill: none;
    stroke-width: 3.8;
}

.circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    transition: stroke-dasharray 0.3s ease, stroke 0.3s ease;
}

.percentage {
    font-family: sans-serif;
    font-size: 0.5em;
    text-anchor: middle;
}
</style>