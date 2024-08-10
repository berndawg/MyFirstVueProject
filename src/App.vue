<template>
    <main>
        <div v-if="mounted">
            <ol v-for="step in app.getSteps()">
                <li>
                    {{ step.text }} {{ step.status }}

                    <ul v-for="substep in app.getSubSteps(step.id)">
                        <li @click="app.subStepClicked(substep.id)"> {{ substep.text }}  {{ substep.status }} </li>
                    </ul>
                </li>
            </ol>
            <div>You are currently working on: {{ app.currentSubStep?.text }}</div>
        </div>
    </main>
</template>

<script>
    import NextLevelIraApplication from "@/next-level-ira-application.js";

    export default {

        data: function () {
            return {
                id: null,
                app: null,
                mounted: false,
            };
        },

        mounted: function () {
            this.app = new NextLevelIraApplication();

            this.mounted = true;
        },

    };

</script>

<style lang="scss"></style>
