<template>
    <div class="cols">
        <div class="single-form-left">
            <div class="contact-single">
                <h3 class="editContent">Оставить комментарий</h3>
                <form action="#" method="get" class="mt-4">
                    <div class="form-group editContent">
                        <label for="contactcomment" class="editContent" >Ваш комментарий *</label>
                        <textarea class="form-control border" rows="5" id="contactcomment" required="" ></textarea>
                    </div>
                    <button type="submit" class="mt-3 btn btn-success btn-block py-3">Отправить</button>
                </form>
            </div>
        </div>
        <div class="media py-5">
            <img src="bundles/images/te2.jpg" class="mr-3 img-fluid" alt=""/>
            <div class="media-body mt-4">
                <h5 class="mt-0 editContent">Daniel Doe</h5>
                <p class="mt-2 editContent">
                    Cras sit amet nibh libero, in gravida nulla.
                    Nulla vel metus scelerisque ante
                    sollicitudin. Cras purus odio, vestibulum in
                    vulputate at, tempus viverra turpis.
                </p>
                <div class="media mt-5 editContent">
                    <a class="pr-3" href="#">
                        <img src="bundles/images/te1.jpg" class="img-fluid" alt=""/>
                    </a>
                    <div class="media-body">
                        <h5 class="mt-0 editContent">Leia Organa</h5>
                        <p class="mt-2 editContent">
                            Cras sit amet nibh libero, in
                            gravida nulla. Nulla vel metus
                            scelerisque ante sollicitudin. Cras
                            purus odio, vestibulum in vulputate
                            at, tempus viverra turpis. Fusce
                            condimentum nunc ac nisi vulputate
                            fringilla..
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comment",
    
    
};
</script>

<style scoped>

</style>
