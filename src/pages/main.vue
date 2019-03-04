<template>
	<div>
		<myHeader/>
		
		<div class="mainWrap">
			<leftnav/>
			<router-view/>
		</div>
		
	</div>
</template>	

<script>


import leftnav from '@/components/leftnav';
import myHeader from '@/components/header';

export default{
		components: {  
			leftnav,
			myHeader
    },
    data(){
        return {
           
        }
    },
    methods:{

    }
}

</script>
<style lang="scss" >
  
     

</style>

