import Image from "next/image";

const Construction = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-8">
			<h2 className="text-3xl font-semibold font-mono">
				🚧 This Page Is Under Construction! 🚧
			</h2>
			<Image
				alt="Construction Worker"
				src="/images/construction-worker.png"
				height={400}
				width={400}
			/>
			<h2 className="text-3xl font-semibold font-mono">
				Please Check Back Later!
			</h2>
		</div>
	);
};
export default Construction;
