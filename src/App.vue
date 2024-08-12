<template>
    <main>
        <div v-if="mounted">
            <div>You have completed {{ stepWizard.completedStepCount }} of {{ stepWizard.totalStepCount }} steps</div>
            <div v-if="view == 'instructions'">
                <h1>Instruction Mode</h1>
                <ol>
                    <li v-for="group in stepWizard.getGroups()">
                        {{ group }} {{ stepWizard.getGroupStatus(group) }}
                        <ul v-for="step in stepWizard.getGroupSteps(group)">
                            <li @click="stepClicked(step)"> {{ step.text }}  {{ step.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>

            <div v-else-if="view == 'summary'">
                <h1>Summary Mode</h1>
                <ol>
                    <li v-for="group in stepWizard.getGroups()">
                        {{ group }}
                        <ul v-for="step in stepWizard.getGroupSteps(group)">
                            <li @click="stepClicked(step)"> {{ step.text }}  {{ step.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>

            <div v-else-if="view == 'edit'">
                <h1>Edit Mode</h1>

                <input type="button" value="Back" @click="goBack()" />

                <div v-if="stepWizard.currentStep.id == 0">
                    <h1>Acknowledgements</h1>
                    <table>
                        <tr>Has Acknowledgement 1<td></td><td>{{ applicationData.isAcknowledged }}</td></tr>
                        <tr>Is Foreign Actor<td></td><td>{{ applicationData.isForeignActor }}</td></tr>
                    </table>
                </div>

                <div v-else-if="stepWizard.currentStep.Id == 1">
                    <h1>Personal details</h1>
                    <table>
                        <tr>
                            <td>First Name: </td>
                            <td>{{ applicationData.firstName }}</td>
                        </tr>
                        <tr>
                            <td>Last Name: </td>
                            <td>{{ applicationData.lastName }}</td>
                        </tr>
                    </table>
                </div>

                <div v-else>
                    <h1>Step not implemented</h1>
                    {{ stepWizard.currentStep }}
                </div>
                <input type="button" value="Save and continue" @click="saveAndContinue()" />
            </div>
        </div>
    </main>
</template>

<script>
    import { Status, Step, StepWizard } from "@/step-wizard.js";

    export default {

        data: function () {
            return {
                applicationData: null,
                steps: null,
                stepWizard: null,
                view: null,
                mounted: false,
            };
        },

        mounted: function () {
            this.applicationData = this.getApplicationData();
            this.stepWizard = new StepWizard(this.getApplicationData(), this.getSteps());
            this.setView("instructions");
            this.mounted = true;
        },

        methods: {
            getApplicationData() {
                return {
                    isAcknowledged: false,
                    isForeignActor: false,
                    firstName: "Bernie",
                    lastName: "Seabrook",
                    dateOfBirth: null,
                    legalResidencyStatus: null,
                    taxId: null,
                    address: null,
                    address2: null,
                    city: null,
                    state: null,
                    postalCode: null,
                    country: null,
                    otherRegion: null,
                    isMailingAddressSame: false,
                    photoIdType: '',
                    phoneNumber: null,
                    isCannabisRelatedBusiness: null,
                    occupation: null,
                    isEmployed: null,
                    expectedAnnualIncome: 0,
                    expectedRolloverAmount: 0,
                };
            },

            getSteps() {
                var steps = [
                    new Step("Identification information", "Acknowledgements"),
                    new Step("Identification information", "Personal details"),
                    new Step("Identification information", "Legacy residency status"),
                    new Step("Identification information", "Social security number"),
                    new Step("Identification information", "Address"),
                    new Step("Identification information", "Photo Id"),
                    new Step("Identification information", "Contact information"),
                    new Step("Employment information", "Employer information"),
                    new Step("Employment information", "Employment information"),
                    new Step("Employment information", "Income"),
                    new Step("Terms and conditions", "Agreement 1"),
                    new Step("Terms and conditions", "Agreement 2"),
                    new Step("Review and submit", "Review and submit your NextLevel IRA application"),
                ];

                return steps;
            },

            setView(view) {
                console.log('changing view to', view);
                this.view = view;
            },

            stepClicked(step) {
                console.log('step', step.id, 'clicked');

                switch (this.view) {
                    case 'instructions':
                        if (!step.canBeStarted) {
                            console.log('Step cannot be started', step);
                            return;
                        }
                        console.log('Step started', step);
                        step.status = Status.InProgress;
                        this.stepWizard.startStep(step);
                        this.setView('edit');
                        break;
                    case 'summary':
                        this.stepWizard.resumeStep(step);
                        this.setView('edit');
                        break;
                }
            },

            goBack() {
                this.setView('instructions');
            },

            save() {
                var obj = [
                    this.steps,
                    this.applicationData
                ];

                var json = JSON.stringify(obj);

                console.log(json);
            },

            saveAndContinue() {
                var step = this.stepWizard.currentStep;

                if (step.canBeCompleted) {
                    step.status = Status.Completed;
                }

                this.save();

                if (this.stepWizard.allStepsCompleted) {
                    this.setView('summary');
                } else {
                    this.setView('instructions');
                }
            },
        }
    }


</script>

