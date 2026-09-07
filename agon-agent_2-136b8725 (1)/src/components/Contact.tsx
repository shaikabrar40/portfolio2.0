import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Instagram, Loader2, MessageCircle, Phone, Send } from 'lucide-react';

interface ContactProps {
  onSend: (payload: { name: string; email: string; message: string }) => Promise<void>;
}

export default function Contact({ onSend }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    try {
      await onSend({ name: name.trim(), email: email.trim(), message: message.trim() });
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send. Try again.');
    } finally {
      setSending(false);
    }
  };

  const cards = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'WhatsApp',
      value: 'Chat with me',
      href: 'https://wa.me/918074889578',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: '@aura.codes_',
      value: 'Coding tips & builds',
      href: 'https://instagram.com/aura.codes_',
      gradient: 'from-pink-500 via-rose-500 to-orange-400',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: '@s._.abrar__',
      value: 'Personal',
      href: 'https://instagram.com/s._.abrar__',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      value: 'shaikabrar40',
      href: 'https://github.com/shaikabrar40',
      gradient: 'from-slate-700 to-slate-900',
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-slate-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-600/20 via-violet-700/20 to-cyan-500/20" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Contact</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl">Let&apos;s connect</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Open to collaborations, study groups, internships and coding chats. Reach me on WhatsApp or Instagram —
            or drop a message below.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/10"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${c.gradient}`}>
                  {c.icon}
                </span>
                <span>
                  <span className="block font-black text-white">{c.label}</span>
                  <span className="block text-sm text-white/60">{c.value}</span>
                </span>
              </a>
            ))}
            <a
              href="tel:+918074889578"
              className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/10 sm:col-span-2 xl:col-span-2"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-black text-white">+91 80748 89578</span>
                <span className="block text-sm text-white/60">Call or text anytime</span>
              </span>
            </a>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8"
          >
            <h3 className="text-lg font-black text-white">Send a message</h3>
            <p className="mt-1 text-sm text-white/60">Saved straight to my inbox database.</p>
            <div className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={120}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  type="email"
                  maxLength={160}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300"
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Abrar! I loved your portfolio..."
                rows={5}
                maxLength={2000}
                className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-cyan-300"
              />
              {error && <p className="text-sm font-semibold text-rose-300">{error}</p>}
              {sent && (
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-95 disabled:opacity-60 sm:w-auto"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
