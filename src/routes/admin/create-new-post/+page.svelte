	
<script lang="ts">
    import type { PageData } from "./$types.js";
    import Form from "./form.svelte";
    export let data: PageData;
  </script>
   
  <Form data={data.form} />
  
  