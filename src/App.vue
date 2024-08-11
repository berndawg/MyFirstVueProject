<template>
    <main>
        <div v-if="mounted">
            <div v-if="view == 'instructions'">
                <ol>
                    <li v-for="step in stepWizard.getSteps()">
                        {{ step.text }} {{ step.status }}
                        <ul v-for="substep in stepWizard.getSubSteps(step.id)">
                            <li @click="clicked(substep.id)"> {{ substep.text }}  {{ substep.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-else-if="view == 'summary'">
                <ol>
                    <li v-for="step in stepWizard.getSteps()">
                        {{ step.text }} {{ step.status }}
                        <ul v-for="substep in stepWizard.getSubSteps(step.id)">
                            <li @click="clicked(substep.id)"> {{ substep.text }}  {{ substep.status }} </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div v-else>
                <input type="button" value="Back" @click="view = 'instructions'" />
                <div v-if="view == 2">
                    <h1>Acknowledgements</h1>
                    <table>
                        <tr>Has Acknowledgement 1<td></td><td>{{ applicationData.isAcknowledged }}</td></tr>
                        <tr>Is Foreign Actor<td></td><td>{{ applicationData.isForeignActor }}</td></tr>
                    </table>
                </div>
                <div v-else-if="view == 3">
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
                <input type="button" value="Save and continue" @click="saveAndContinue(view)" />
            </div>
        </div>
    </main>
</template>

<script>
    import { StepStatus, StepDetail, StepWizard } from "@/step-wizard.js";

    export default {

        data: function () {
            return {
                applicationData: null,
                stepDetails: null,
                stepWizard: null,
                view: null,
                mounted: false,
            };
        },

        mounted: function () {
            this.applicationData = this.getApplicationData();
            this.stepDetails = this.getStepDetails();
            this.stepWizard = new StepWizard(this.stepDetails);
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

            getStepDetails() {
                return [
                    new StepDetail(1, null, "step", "Identification information", StepStatus.NotStarted),
                    new StepDetail(2, 1, "substep", "Acknowledgements", StepStatus.NotStarted),
                    new StepDetail(3, 1, "substep", "Personal details", StepStatus.NotStarted),
                    new StepDetail(4, 1, "substep", "Legacy residency status", StepStatus.NotStarted),
                    new StepDetail(5, 1, "substep", "Social security number", StepStatus.NotStarted),
                    new StepDetail(6, 1, "substep", "Address", StepStatus.NotStarted),
                    new StepDetail(7, 1, "substep", "Photo Id", StepStatus.NotStarted),
                    new StepDetail(8, 1, "substep", "Contact information", StepStatus.NotStarted),
                    new StepDetail(9, null, "step", "Employment information", StepStatus.CannotStart),
                    new StepDetail(10, 9, "substep", "Employer information", StepStatus.NotStarted),
                    new StepDetail(11, 9, "substep", "Employment information", StepStatus.NotStarted),
                    new StepDetail(12, 9, "substep", "Income", StepStatus.NotStarted),
                    new StepDetail(13, null, "step", "Terms and conditions", StepStatus.CannotStart),
                    new StepDetail(14, 13, "substep", "Agreement 1", StepStatus.NotStarted),
                    new StepDetail(15, 13, "substep", "Agreement 2", StepStatus.NotStarted),
                    new StepDetail(16, null, "step", "Review and submit", StepStatus.CannotStart),
                    new StepDetail(17, 16, "substep", "Review and submit your NextLevel IRA application", StepStatus.NotStarted),
                ];
            },

            clicked(id) {
                console.log('clicked id =', id);

                switch (this.view) {
                    case 'instructions':
                        var step = this.stepWizard.getStep(id);
                        var parent = this.stepWizard.getStep(step.parentId);
                        if (parent.status == StepStatus.CannotStart) return;
                        step.status = StepStatus.InProgress;
                        parent.status = StepStatus.InProgress;
                        this.view = step.id;
                        break;
                    case 'summary':
                        var step = this.stepWizard.getStep(id);
                        this.view = step.id;
                        break;
                }
            },

            saveAndContinue(id) {
                var step = this.stepWizard.getStep(id);
                console.log('saveAndContinue', step.text)
            },
        }
    }


</script>

