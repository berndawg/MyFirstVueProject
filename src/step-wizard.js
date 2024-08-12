"use strict";

const Status = {
    CannotStart: "cannotStart",
    NotStarted: "notStarted",
    InProgress: "inProgress",
    Completed: "completed",
};

class Step {
    constructor(name) {
        this.parent = null;
        this.name = name;
        this.status = Status.NotStarted;
        this.steps = [];
    }

    get isCompleted() {
        return this.status == Status.Completed;
    }

    get canStartStep() {
        return this.status != Status.CannotStart;
    }

    addStep(step) {
        this.steps.push(step);
        step.parent = this;
    }
}

class Application extends Step {
    constructor() {
        super("Application");
        let step1 = new Step("Identification information")
        step1.addStep(new Step("Acknowledgements"));
        step1.addStep(new Step("Personal Details"));
        step1.addStep(new Step("Legal residency status"));
        step1.addStep(new Step("Address"));
        step1.addStep(new Step("Photo ID"));
        step1.addStep(new Step("Contact information"));

        let step2 = new Step("Employment information");
        step2.addStep(new Step("Employer information"));
        step2.addStep(new Step("Personal Employment information"));
        step2.addStep(new Step("Income"));

        let step3 = new Step("Terms and conditions");
        step3.addStep(new Step("Agreement 1"));
        step3.addStep(new Step("Agreement 2"));

        let step4 = new Step("Review and submit");
        step4.addStep(new Step("review and submit your application"));

        this.addStep(step1);
        this.addStep(step2);
        this.addStep(step3);
    }

    markStepNotStarted(step) {
        this.setStepStatus(step, Status.NotStarted);
    }

    markStepCannotStart(step) {
        this.setStepStatus(step, Status.CannotStart);
    }

    markStepCompleted(step) {
        this.setStepStatus(step, Status.Completed);
    }

    markStepInProgress(step) {
        this.setStepStatus(step, Status.InProgress);
    }

    setStepStatus(step, status) {
        step.status = status;
        for (var child of step.steps) child.status = status;
        if (step.parent) this.reviewStepStatus(step.parent);
    }

    reviewStepStatus(step) {
        if (step.steps.every(child => child.status == Status.Completed)) {
            step.status = Status.Completed;
        } else if (step.steps.some(child => child.status == Status.Completed || child.status == Status.InProgress)) {
            step.status = Status.InProgress;
        }

        if (step.parent) this.reviewStepStatus(step.parent);
    }
}

export { Application, Status, Step }
