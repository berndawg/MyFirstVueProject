"use strict";

const StepStatus = {
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
        this.status = StepStatus.NotStarted;
        this.id = Step._id;

        Step._id++;
    }
}

class StepWizard {
    constructor(stepDetails) {
        this.Steps = stepDetails;
        this._currentStepId = 0;
    }

    get currentStepId() {
        return this._currentStepId;
    }

    set currentStepId(id) {
        this._currentStepId = id;
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
        if (groups.some(x => x.status == StepStatus.InProgress)) return StepStatus.InProgress;
        if (groups.every(x => x.status == StepStatus.Completed)) return StepStatus.Completed;
        return StepStatus.NotStarted;
    }

    isLastStep(id) {
        return id == this.Steps.length;
    }

    nextStep() {
        this.currentStepId = this.currentStepId + 1;
    }
}

export { StepStatus, Step, StepWizard }
