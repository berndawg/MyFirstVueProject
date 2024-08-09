<template>
    <main>
        <div v-if="mounted">
            <div>{{ app.completedSteps }} of {{ app.totalSteps }} completed</div>
            <div v-for="step in app.steps">
                <div>
                    <span style="font-size:x-large">{{ step.name }}</span>
                    <span style="color:red"> {{ step.status }}</span>
                    <div v-for="subStep in step.subSteps">
                        <span style="font-size:medium">{{ subStep.name }}</span>
                        <span style="color:blue"> {{ subStep.status }}</span>
                    </div>

                </div>
            </div>
            <div>
                <span @click="back"> [Back] </span>
                <span @click="next"> [Next] </span>
            </div>
        </div>
    </main>
</template>

<script>
    import NextLevelIraApplication from "@/next-level-ira-application.js";

    export default {

        data: function () {
            return {
                app: null,
                mounted: false,
            };
        },

        mounted: function () {
            this.app = new NextLevelIraApplication();

            this.mounted = true;
        },

        methods: {
            back: function () {
                console.log('Back clicked');
            },
            next: function () {
                console.log('Next clicked');
            }
        }
    };

</script>

<style lang="scss"></style>
