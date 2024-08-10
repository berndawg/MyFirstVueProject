"use strict";

const Status = {
    CannotStart: "cannotStart",
    NotStarted: "notStarted",
    InProgress: "inProgress",
    Completed: "completed"
}

class ApplicationData {
    constructor() {
        this.isAcknowledged = null;
        this.isForeignActor = null;
        this.firstName = null;
        this.lastName = null;
        this.dateOfBirth = null;
        this.legalResidencyStatus = null;
        this.taxId = null;
        this.address = null;
        this.address2 = null;
        this.city = null;
        this.state = null;
        this.postalCode = null;
        this.country = null;
        this.otherRegion = null;
        this.isMailingAddressSame = false;
        this.photoIdType = '';
        this.phoneNumber = null;
        this.isCannabisRelatedBusiness = null;
        this.occupation = null;
        this.isEmployed = null;
        this.expectedAnnualIncome = 0;
        this.expectedRolloverAmount = 0;
    }
}

class NextLevelIraApplication {
    constructor() {
        this.data = new ApplicationData();
        this._rows = [
            { id: 1, parentId: null, type: "step", text: "Identification information", status: Status.NotStarted },
            { id: 2, parentId: 1, type: "substep", text: "Acknowledgements", status: Status.NotStarted },
            { id: 3, parentId: 1, type: "substep", text: "Personal details", status: Status.NotStarted },
            { id: 4, parentId: 1, type: "substep", text: "Legacy residency status", status: Status.NotStarted },
            { id: 5, parentId: 1, type: "substep", text: "Social security number", status: Status.NotStarted },
            { id: 6, parentId: 1, type: "substep", text: "Address", status: Status.NotStarted },
            { id: 7, parentId: 1, type: "substep", text: "Photo Id", status: Status.NotStarted },
            { id: 8, parentId: 1, type: "substep", text: "Contact information", status: Status.NotStarted },
            { id: 9, parentId: null, type: "step", text: "Employment information", status: Status.CannotStart },
            { id: 10, parentId: 9, type: "substep", text: "Employer information", status: Status.NotStarted },
            { id: 11, parentId: 9, type: "substep", text: "Employment information", status: Status.NotStarted },
            { id: 12, parentId: 9, type: "substep", text: "Income", status: Status.NotStarted },
            { id: 13, parentId: null, type: "step", text: "Terms and conditions", status: Status.CannotStart },
            { id: 14, parentId: 13, type: "substep", text: "Agreement 1", status: Status.NotStarted },
            { id: 15, parentId: 13, type: "substep", text: "Agreement 2", status: Status.NotStarted },
            { id: 16, parentId: null, type: "step", text: "Review and submit", status: Status.CannotStart },
            { id: 17, parentId: 16, type: "substep", text: "Review and submit your NextLevel IRA application", status: Status.NotStarted },
        ];
    }

    getSteps() {
        return this._rows.filter(x => x.type == 'step');
    }

    getSubSteps(id) {
        return this._rows.filter(x => x.parentId == id);
    }

    getParent(id) {
        return this._rows[id - 1];
    }

    getSubStep(id) {
        return this._rows[id - 1];
    }

    get currentSubStep() {
        return this._currentSubStep;
    }

    subStepClicked(id) {
        var substep = this.getSubStep(id);
        if (substep.Status == Status.CannotStart) return;

        var parent = this.getParent(substep.parentId);
        if (parent.status == Status.CannotStart) return;

        parent.status = Status.InProgress;

        if (substep.status != Status.Completed) {
            substep.status = Status.InProgress;
        }
        this._currentSubStep = substep;

        this.updateStatuses();
    }

    updateStatuses() {
        var steps = this.getSteps();
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (this.allSubStepsComplete(step.id)) {
                step.status = Status.Completed;
            }
        }
    }

    allSubStepsComplete(id) {
        var substeps = this.getSubSteps(id);
        return substeps.map(x => x.Status == Status.Completed).length == substeps.length;
    }
}

export default NextLevelIraApplication;