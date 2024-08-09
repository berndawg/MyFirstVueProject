<template>
    <main>
        <div v-if="mounted">
            <div v-for="step in app.steps">
                <div>
                    <span style="font-size:x-large">{{ step.name }}</span>
                    <span v-if="step == app.currentStep">  (Current Step)</span>

                    <div v-for="subStep in step.subSteps">
                        <span style="font-size:medium">{{ subStep.name }}</span>
                    </div>
                </div>
            </div>
            <div>
                <span @click="back"> [Back]</span>
                <span>Current step: {{app.currentStep.name}}</span>
                <span @click="next"> [Next]</span>
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

            var s = JSON.stringify(this.app);

            console.log(s);

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
