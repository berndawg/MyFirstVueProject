<template>
    <main>
        <div v-if="mounted">
            <div v-if="view == 'instructions'">
                <ol>
                    <li v-for="group in stepWizard.getGroups()">
                        {{ group }} {{ stepWizard.getGroupStatus(group) }}
                        <ul v-for="step in stepWizard.getGroupSteps(group)">
                            <li @click="clicked(step.id)"> {{ step.text }}  {{ step.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-else-if="view == 'summary'">
                <ol>
                    <li v-for="group in stepWizard.getGroups()">
                        {{ group }} 
                        <ul v-for="step in stepWizard.getGroupSteps(group)">
                            <li @click="clicked(step.id)"> {{ step.text }}  {{ step.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-else>
                <input type="button" value="Back" @click="view = 'instructions'" />
                <div v-if="stepWizard.currentStepId == 0">
                    <h1>Acknowledgements</h1>
                    <table>
                        <tr>Has Acknowledgement 1<td></td><td>{{ applicationData.isAcknowledged }}</td></tr>
                        <tr>Is Foreign Actor<td></td><td>{{ applicationData.isForeignActor }}</td></tr>
                    </table>
                </div>
                <div v-else-if="stepWizard.currentStepId == 1">
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
                <div v-else>view {{ view }} not implemented</div>
                <input type="button" value="Save and continue" @click="saveAndContinue()" />
            </div>
        </div>
    </main>
</template>

<script>
    import { StepStatus, Step, StepWizard } from "@/step-wizard.js";

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
            this.steps = this.getSteps();
            this.stepWizard = new StepWizard(this.steps);
            this.view = "instructions";
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
                return [
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
            },

            clicked(id) {
                console.log('clicked id =', id);

                switch (this.view) {
                    case 'instructions':
                        var step = this.stepWizard.getStep(id);
                        step.status = StepStatus.InProgress;
                        this.view = step.id;
                        break;
                    case 'summary':
                        var step = this.stepWizard.getStep(id);
                        this.view = step.id;
                        break;
                }
            },

            saveAndContinue() {
                // save serialized stepWizard
                this.stepWizard.nextStep();
                this.view = this.stepWizard.currentStepId;
            },
        }
    }


</script>

