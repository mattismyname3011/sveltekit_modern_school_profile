# `+page.svelte`

```svelte
<script>
  const programs = [
    {
      title: 'Science',
      description: 'Hands-on scientific learning with modern laboratories.'
    },
    {
      title: 'Technology',
      description: 'Coding, robotics, and digital innovation programs.'
    },
    {
      title: 'Arts',
      description: 'Creative expression through visual and performing arts.'
    },
    {
      title: 'Business',
      description: 'Entrepreneurship and leadership-focused education.'
    },
    {
      title: 'Sports',
      description: 'Athletic development with competitive opportunities.'
    }
  ]

  const extracurriculars = [
    {
      title: 'Robotics Club',
      icon: '🤖',
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
      description: 'Students build innovative robots and participate in competitions.'
    },
    {
      title: 'Basketball Team',
      icon: '🏀',
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
      description: 'Competitive sports program focused on teamwork and discipline.'
    },
    {
      title: 'Music Society',
      icon: '🎵',
      image:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
      description: 'Students explore instruments, vocals, and performances.'
    }
  ]

  const events = [
    {
      title: 'Innovation Seminar',
      date: 'March 12, 2026',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      description: 'Technology and leadership seminar with guest speakers.'
    },
    {
      title: 'Sports Competition',
      date: 'April 8, 2026',
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop',
      description: 'Annual interschool sports championship event.'
    },
    {
      title: 'Graduation Ceremony',
      date: 'June 18, 2026',
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
      description: 'Celebrating student achievements and milestones.'
    },
    {
      title: 'Creative Workshop',
      date: 'July 2, 2026',
      image:
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop',
      description: 'Interactive creative learning workshops for students.'
    },
    {
      title: 'Coding Bootcamp',
      date: 'August 15, 2026',
      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
      description: 'Programming and innovation bootcamp for young developers.'
    }
  ]

  const blogPosts = [
    {
      title: 'Science Fair 2026 Highlights',
      category: 'School Event',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
      summary:
        'Students showcased creative scientific experiments and projects.'
    },
    {
      title: 'Basketball Team Victory',
      category: 'Sports',
      image:
        'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop',
      summary:
        'Our team won the regional championship after an exciting final.'
    },
    {
      title: 'Leadership Camp Success',
      category: 'Student Life',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
      summary:
        'Students learned collaboration, leadership, and communication skills.'
    }
  ]
</script>

<svelte:head>
  <title>EduNova School</title>
  <meta
    name="description"
    content="Modern school website landing page built with SvelteKit"
  />
</svelte:head>

<div class="min-h-screen bg-white text-slate-800">
  <nav class="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-black text-blue-900">EduNova</div>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Programs</a>
        <a href="/">Events</a>
        <a href="/">Gallery</a>
        <a href="/">Contact</a>
      </div>

      <button
        class="bg-blue-900 text-white px-5 py-3 rounded-full hover:bg-sky-500 transition-all duration-300"
      >
        Student Portal
      </button>
    </div>
  </nav>

  <section
    class="pt-40 pb-24 px-6 bg-linear-to-br from-blue-950 via-blue-900 to-sky-500 text-white"
  >
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight">
          Empowering Future Leaders Through Education
        </h1>

        <p class="mt-8 text-lg text-blue-100 leading-relaxed max-w-xl">
          Building academic excellence, innovation, and leadership in a modern learning environment.
        </p>

        <div class="flex flex-wrap gap-4 mt-10">
          <button
            class="bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
          >
            Enroll Now
          </button>

          <button
            class="border border-white/40 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
          >
            Explore Programs
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-12">
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <h3 class="text-3xl font-black">2,500+</h3>
            <p class="text-sm text-blue-100 mt-2">Students</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <h3 class="text-3xl font-black">120+</h3>
            <p class="text-sm text-blue-100 mt-2">Teachers</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
            <h3 class="text-3xl font-black">98%</h3>
            <p class="text-sm text-blue-100 mt-2">Graduation Rate</p>
          </div>
        </div>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
          alt="Students"
          class="rounded-4xl shadow-2xl"
        />
      </div>
    </div>
  </section>

  <section class="py-24 px-6 bg-slate-50">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-4xl font-black text-blue-950">Academic Programs</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
        {#each programs as program}
          <div
            class="bg-white rounded-4xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <h3 class="text-2xl font-bold text-blue-900 mb-4">{program.title}</h3>

            <p class="text-slate-600 leading-relaxed text-sm">
              {program.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-black text-blue-950">
          Extracurricular Activities
        </h2>

        <p class="text-slate-600 mt-5 text-lg max-w-3xl mx-auto">
          Students can develop creativity, leadership, and teamwork beyond the classroom.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each extracurriculars as activity}
          <div
            class="group overflow-hidden bg-slate-50 rounded-4xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div class="relative h-60 overflow-hidden">
              <img
                src={activity.image}
                alt={activity.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div
                class="absolute top-5 left-5 bg-white/90 backdrop-blur-lg w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              >
                {activity.icon}
              </div>
            </div>

            <div class="p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">
                {activity.title}
              </h3>

              <p class="text-slate-600 leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-24 px-6 bg-slate-50">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-14">
        <div>
          <h2 class="text-4xl font-black text-blue-950">Upcoming Events</h2>

          <p class="text-slate-600 mt-4 text-lg">
            Stay updated with the latest school activities and events.
          </p>
        </div>

        <button
          class="hidden md:block border border-blue-900 text-blue-900 px-6 py-3 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300"
        >
          View All Events
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each events.slice(0, 4) as event}
          <div
            class="group overflow-hidden bg-white rounded-4xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div
                class="absolute top-4 left-4 bg-yellow-400 text-blue-950 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                {event.date}
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-blue-900 mb-3">{event.title}</h3>

              <p class="text-slate-600 text-sm leading-relaxed mb-5">
                {event.description}
              </p>

              <button
                class="text-blue-900 font-semibold hover:text-sky-500 transition-colors duration-300"
              >
                View Event
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-14">
        <div>
          <h2 class="text-4xl font-black text-blue-950">
            School News & Blog
          </h2>

          <p class="text-slate-600 mt-4 text-lg max-w-2xl">
            Highlights and summaries from school events and activities.
          </p>
        </div>

        <button
          class="hidden md:block border border-blue-900 text-blue-900 px-6 py-3 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300"
        >
          View All Posts
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each blogPosts as post}
          <div
            class="group overflow-hidden bg-slate-50 rounded-4xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div
                class="absolute top-4 left-4 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-semibold text-blue-900 shadow-lg"
              >
                {post.category}
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">{post.title}</h3>

              <p class="text-slate-600 leading-relaxed mb-6">
                {post.summary}
              </p>

              <button
                class="text-blue-900 font-semibold hover:text-sky-500 transition-colors duration-300"
              >
                Read Full Story
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="py-24 px-6 bg-linear-to-r from-blue-900 to-sky-500 text-white text-center">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-5xl font-black">Admissions Open for 2026</h2>

      <p class="mt-6 text-lg text-blue-100">
        Begin your academic journey with a modern and future-focused education.
      </p>

      <button
        class="mt-10 bg-yellow-400 text-blue-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
      >
        Apply Now
      </button>
    </div>
  </section>

  <footer class="bg-blue-950 text-white py-16 px-6">
    <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
      <div>
        <h3 class="text-2xl font-black">EduNova</h3>

        <p class="text-blue-100 mt-4 leading-relaxed">
          A modern institution dedicated to academic excellence and innovation.
        </p>
      </div>

      <div>
        <h4 class="font-bold mb-4">Quick Links</h4>

        <div class="flex flex-col gap-3 text-blue-100">
          <a href="/">Programs</a>
          <a href="/">Admissions</a>
          <a href="/">Events</a>
          <a href="/">Gallery</a>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-4">Contact</h4>

        <div class="flex flex-col gap-3 text-blue-100">
          <p>info@edunova.edu</p>
          <p>+62 812 3456 7890</p>
          <p>Jakarta, Indonesia</p>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-4">Newsletter</h4>

        <div class="flex gap-3 mt-4">
          <input
            type="email"
            placeholder="Your email"
            class="w-full px-4 py-3 rounded-full text-slate-800 outline-none"
          />

          <button class="bg-yellow-400 text-blue-950 px-5 rounded-full font-bold">
            Join
          </button>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 mt-12 pt-8 text-center text-blue-200 text-sm">
      Copyright 2026 EduNova. All rights reserved.
    </div>
  </footer>
</div>
```

<!-- # Install TailwindCSS in SvelteKit

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init tailwind.config.cjs -p
```

# `tailwind.config.cjs`

```js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

# `src/app.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, sans-serif;
  background: #ffffff;
}
```

# `src/routes/+layout.svelte`

```svelte
<script>
  import '../app.css'
</script>

<slot />
``` -->
