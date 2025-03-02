import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import Rules from "@/views/Rules.vue";
import Credits from "@/views/Credits.vue";
import Categories from "@/views/Categories.vue";
import Quiz from "@/views/Quiz.vue";
import PeleMele from "@/views/PeleMele.vue";
import Stats from "@/views/Stats.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/rules", name: "Rules", component: Rules },
    { path: "/credits", name: "Credits", component: Credits },
    { path: "/categories", name: "Categories", component: Categories },
    { path: "/quiz/:categoryId/:categoryName", name: "Quiz", component: Quiz},
    { path: "/pele-mele/:numberOfQuestions", name: "RandomQuiz", component: Quiz},
    { path: "/pele-mele", name: "PeleMele", component: PeleMele},
    { path: "/stats", name: "Stats", component: Stats},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
