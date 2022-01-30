<template>
    <div>
        <ul class="pagination justify-content-center">
            <li @click="prevButton(currentPage, category)" :class="{disabled: currentPage===1}" class="page-item"><button class="page-link">Previous</button></li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{active: currentPage === page}">
                <button class="pagination-button page-link" @click="changePage(page, category)">{{ page }}</button>
            </li>
            <li @click="nextButton(currentPage, category)" :class="{disabled: currentPage===totalPages}" class="page-item"><button class="page-link">Next</button></li>
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
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.total / this.page_size)
            }
        },
        methods: {
            changePage(pageNumber, categoryName) {
                this.currentPage = pageNumber
                this.$emit('page-changed', pageNumber, categoryName)
            },
            nextButton(pageNumber, categoryName) {
                if(pageNumber < this.totalPages){
                    pageNumber++
                    this.changePage(pageNumber, categoryName)
                }
            },
            prevButton(pageNumber, categoryName) {
                if(pageNumber > 1){
                    pageNumber--
                    this.changePage(pageNumber, categoryName)
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
