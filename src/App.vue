<template>
    <main>
        <div v-if="application">
            <div>Your application is: {{ application.status }}</div>
            <div>
                <ol>
                    <li v-for="step in application.steps">
                        {{ step.name }} ({{ step.status }})
                        <ul v-for="step in step.steps">
                            <li>
                                {{ step.name }} ({{ step.status }})
                                <span v-if="step.canStartStep">
                                    <span style="text-decoration: underline;" @click="editStep(step)">edit</span>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-if="viewMode == 'edit'">
                <div>You are editing step {{ currentStep.name }} </div>
                <span style="text-decoration: underline;" @click="markStepCompleted(currentStep)">valid</span> &nbsp;
                <span style="text-decoration: underline;" @click="markStepInProgress(currentStep)">invalid</span>
            </div>
        </div>

    </main>
</template>

<script>
    import { Application, Status, Step } from "@/step-wizard.js";

    export default {

        data: function () {
            return {
                currentStep: null,
                viewMode: 'instructions',
                application: null,
            };
        },

        methods: {
            editStep(step) {
                this.currentStep = step;
                this.viewMode = 'edit';
            },

            markStepCompleted(step) {
                this.application.markStepCompleted(step);
                this.viewMode = 'instructions';
            },

            markStepInProgress(step) {
                this.application.markStepInProgress(step);
                this.viewMode = 'instructions';
            },
        },

        mounted: function () {
            this.application = new Application();
        },
    }

</script>

