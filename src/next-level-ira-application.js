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

class SubStep {
    constructor(name, status = Status.NotStarted) {
        this.name = name;
        this.status = status;
        this.hidden = false;
    }
}

class Step {
    constructor(name, status = Status.NotStarted) {
        this.name = name;
        this.status = status;

        this._subSteps = [];

        console.log("Step being created:", name);

        if (name == "Identification information") {
            this._subSteps = [
                new SubStep("Acknowledgements"),
                new SubStep("Personal details"),
                new SubStep("Legal residency status"),
                new SubStep("Social Security Number"),
                new SubStep("Address"),
                new SubStep("Photo ID"),
                new SubStep("Contact information"),
            ];

            this._subSteps[3].hidden = true;
        }

        else if (name == "Employment information") {
            this._subSteps = [
                new SubStep("Employer information"),
                new SubStep("Employment information details"),
                new SubStep("Income")
            ];
        }
        else if (name == "Terms and conditions") {
            this._subSteps = [
                new SubStep("Agreement 1"),
                new SubStep("Agreement 2")
            ];
        }
        else if (name == "Review and submit") {
            this._subSteps = [
                new SubStep("Review and submit your NextLevel IRA application")
            ];
        }
    }

    get subSteps() {
        console.log("Step", this.name, "has", this._subSteps.length, "sub-steps.");
        return this._subSteps;
    }

}


class NextLevelIraApplication {
    constructor() {
        this.data = new ApplicationData();

        this._steps = [
            new Step("Identification information"),
            new Step("Employment information"),
            new Step("Terms and conditions"),
            new Step("Review and submit")
        ];
    }

    get steps() {
        return this._steps;
    }

    get completedSteps() {
        return this._steps.filter(x => x.status == Status.Completed).length;
    }

    get totalSteps() {
        return this._steps.length;
    }
    get currentStep() {
        return this.steps.find(x => x.status == Status.InProgress);
    }

    moveToNextStep() {
        console.log("moving to next step");
    }
}

export default NextLevelIraApplication;