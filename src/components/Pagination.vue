<template>
    <div v-if="totalPages>1">
        <ul class="pagination justify-content-center">
            <li @click="prevButton(currentPage)" :class="{disabled: currentPage===1}" class="page-item"><button class="page-link">Previous</button></li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{active: currentPage === page}">
                <button class="pagination-button page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li @click="nextButton(currentPage)" :class="{disabled: currentPage===totalPages}" class="page-item"><button class="page-link">Next</button></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['total', 'page_size', 'category'],
        data() {
            return {
                currentPage: 1,
                search: this.$store.state.search || ''
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.total / this.page_size)
            },
        },
        methods: {
            changePage(pageNumber) {
                this.currentPage = pageNumber
                this.$emit('page-changed', pageNumber, this.search)
            },
            nextButton(pageNumber) {
                if(pageNumber < this.totalPages){
                    pageNumber++
                    this.changePage(pageNumber)
                }
            },
            prevButton(pageNumber) {
                if(pageNumber > 1){
                    pageNumber--
                    this.changePage(pageNumber)
                }
            },
        }
    }

</script>

<style scoped>
    .page-link{
        color: #ff4c4c;
    }
    .page-item.active .page-link {
        background-color: #ff4c4c;
        border-color: #ff4c4c;
    }

</style>
