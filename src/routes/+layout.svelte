<script>
	import './styles.css';
</script>

<div class="flex flex-col min-h-screen max-h-max">
	<main class="flex-1 flex flex-col p-4 w-full max-w-4xl mx-auto">
		<slot />
	</main>
	<footer class="text-center text-white py-3">
		<p>&copy; Shubham Singh 2023</p>
	</footer>
</div>
