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
    constructor(stepDetails) {
        this.steps = stepDetails;
        this.currentStep = null;
    }

    get completedStepCount() {
        return this.steps.filter(x=>x.status == Status.Completed).length;
    }

    get totalStepCount() {
        return this.steps.length;
    }

    getGroups() {
        const results = this.steps.map(x => x.group);
        const uniqueArray = [...new Set(results)];
        return uniqueArray;
    }

    getGroupSteps(group) {
        return this.steps.filter(x => x.group == group);
    }

    getGroupStatus(group) {
        var steps = this.getGroupSteps(group)
        
        // if the group cannot be started the steps couldn't be in progress or complete
        if (group.status == Status.CannotStart) return Status.CannotStart;

        // if all steps are complete then group is complete
        if (steps.every(x => x.status == Status.Completed)) return Status.Completed; 

        // if any steps are in progress or complete, then group is in progress
        if (steps.some(x => x.status == Status.InProgress || x.status == Status.Completed)) return Status.InProgress; 

        return Status.NotStarted;
    }
    get allStepsCompleted() {
        return this.steps.filter(x=>x.status == Status.Completed).length == this.steps.length;
    }

    completeStep(step) {
        if (step.status != Status.InProgress) throw new Error('Cannot complete step', step);
        step.status = Status.Completed;
        console.log('Step completed', step);
    }

    startStep(step) {
        if (step.status == Status.CannotStart) throw new Error('Cannot start step', step);
        this.currentStep = step;
        console.log('Step started', step);
    }

    resumeStep(step) {
        // if (step.status != Status.InProgress) throw new Error('Cannot resume step', step);
        step.status = Status.InProgress;
        this.currentStep = step;
        console.log('Step resumed', step);
    }
}

export { Status, Step, StepWizard }
