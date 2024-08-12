"use strict";

const Status = {
    CannotStart: "cannotStart",
    NotStarted: "notStarted",
    InProgress: "inProgress",
    Completed: "completed"
}

class Step {
    static _id = 0;

    constructor(group, text) {
        this.group = group;
        this.text = text;
        this.status = Status.NotStarted;
        this.id = Step._id;
        Step._id++;
    }

    get canBeStarted() {
        if (this.status == Status.CannotStart) return false;
        return true;
    }

    get canBeCompleted() {
        return true;
    }
}

class StepWizard {
    constructor(applicationData, stepDetails) {
        this.applicationData = applicationData;
        this.Steps = stepDetails;
        this.CurrentStep = null;
    }

    get completedStepCount() {
        return this.Steps.filter(x=>x.status == Status.Completed).length;
    }

    get totalStepCount() {
        return this.Steps.length;
    }

    getGroups() {
        const results = this.Steps.map(x => x.group);
        const uniqueArray = [...new Set(results)];
        return uniqueArray;
    }

    getGroupSteps(group) {
        return this.Steps.filter(x => x.group == group);
    }

    getStep(id) {
        return this.Steps[id];
    }

    getGroupStatus(group) {
        var groups = this.getGroupSteps(group)
        if (groups.some(x => x.status == Status.InProgress)) return Status.InProgress;
        if (groups.every(x => x.status == Status.Completed)) return Status.Completed;
        return Status.NotStarted;
    }

    get allStepsCompleted() {
        return this.Steps.filter(x=>x.status == Status.Completed).length == this.Steps.length;
    }

    completeStep(step) {
        if (step.status != Status.InProgress) throw new Error('Cannot complete step', step);
        step.status = Status.Completed;
    }

    startStep(step) {
        if (step.status == Status.CannotStart) throw new Error('Cannot start step', step);
        this.currentStep = step;
    }

    resumeStep(step) {
        if (step.status != Status.Completed) throw new Error('Cannot start step, id');
        this.currentStep = step;
    }
}

export { Status, Step, StepWizard }
