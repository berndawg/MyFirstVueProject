<template>
    <main>
        <div v-if="mounted">
            <ol v-for="step in app.steps">
                <li>
                    {{ step.text }} {{ step.status }}

                    <ul v-for="substep in app.getSubSteps(step.id)">
                        <li> {{ substep.text }}  {{ substep.status }} </li>
                    </ul>
                </li>
            </ol>
            <div>You are currently working on: {{ app.currentSubStep }}</div>
        </div>
    </main>
</template>

<script>
    import NextLevelIraApplication from "@/next-level-ira-application.js";

    export default {

        data: function () {
            return {
                app: null,
                mounted: false,
            };
        },

        mounted: function () {
            this.app = new NextLevelIraApplication();

            this.mounted = true;
        },

        methods: {
            back: function () {
                console.log('Back clicked');
            },
            next: function () {
                console.log('Next clicked');
            }
        }
    };

</script>

<style lang="scss"></style>
