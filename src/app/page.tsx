import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-start justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 space-y-6 border dark:border-zinc-800">
        <h2 className="text-2xl font-semibold text-center text-zinc-900 dark:text-white">
          Contact Us
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
