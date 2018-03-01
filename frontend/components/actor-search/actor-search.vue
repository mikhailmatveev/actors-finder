<template>
    <div class="component-wrapper">
        <form>
            <input v-model="q" v-on:keyup="keyUp" type="text" class="form-control" placeholder="Кого искать?" aria-label="Кого искать?">
        </form>
        <ul class="media-list">
            <li v-cloak v-for="actor in actors" class="media">
                <div class="media-left">
                    <router-link :to="{ path: '/actor/' + actor.id }">
                        <img :src="actor.avatars[0]" :alt="actor.name" class="media-object img-thumbnail"/>
                    </router-link>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">{{actor.name}}</h4>
                    <p v-if="hasAliases(actor)">{{getAliases(actor)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script src="./actor-search.js"></script>

<style src="./actor-search.css" scoped></style>
