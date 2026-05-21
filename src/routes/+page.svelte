<script>
  const navLinks = ["Home", "About", "Programs", "Events", "Gallery", "Contact"];

  const programs = [
    {
      title: "Science",
      description: "Hands-on scientific learning with modern laboratories.",
    },
    {
      title: "Technology",
      description: "Coding, robotics, and digital innovation programs.",
    },
    {
      title: "Arts",
      description: "Creative expression through visual and performing arts.",
    },
    {
      title: "Business",
      description: "Entrepreneurship and leadership-focused education.",
    },
    {
      title: "Sports",
      description: "Athletic development with competitive opportunities.",
    },
  ];

  const extracurriculars = [
    {
      title: "Robotics Club",
      icon: "🤖",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      description:
        "Students build innovative robots and participate in competitions.",
    },
    {
      title: "Basketball Team",
      icon: "🏀",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
      description:
        "Competitive sports program focused on teamwork and discipline.",
    },
    {
      title: "Music Society",
      icon: "🎵",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
      description: "Students explore instruments, vocals, and performances.",
    },
  ];

  const events = [
    {
      title: "Innovation Seminar",
      date: "March 12, 2026",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      description: "Technology and leadership seminar with guest speakers.",
    },
    {
      title: "Sports Competition",
      date: "April 8, 2026",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
      description: "Annual interschool sports championship event.",
    },
    {
      title: "Graduation Ceremony",
      date: "June 18, 2026",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
      description: "Celebrating student achievements and milestones.",
    },
    {
      title: "Creative Workshop",
      date: "July 2, 2026",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      description: "Interactive creative learning workshops for students.",
    },
    {
      title: "Coding Bootcamp",
      date: "August 15, 2026",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      description: "Programming and innovation bootcamp for young developers.",
    },
  ];

  const blogPosts = [
    {
      title: "Science Fair 2026 Highlights",
      category: "School Event",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
      summary:
        "Students showcased creative scientific experiments and projects.",
    },
    {
      title: "Basketball Team Victory",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop",
      summary:
        "Our team won the regional championship after an exciting final.",
    },
    {
      title: "Leadership Camp Success",
      category: "Student Life",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      summary:
        "Students learned collaboration, leadership, and communication skills.",
    },
  ];
</script>

# `+page.svelte` ```svelte
<svelte:head>
  <title>EduNova School</title>
  <meta
    name="description"
    content="Modern school website landing page built with SvelteKit"
  />
</svelte:head>

<div class="min-h-screen bg-white text-slate-800">
  <nav
    class="fixed left-0 top-0 z-50 w-full border-b border-blue-950/8 bg-[oklch(98%_0.01_235)]/88 text-blue-950 shadow-sm shadow-blue-950/5 backdrop-blur-xl"
    aria-label="Primary navigation"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-3.5">
      <a
        href="/"
        class="group flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 sm:gap-3"
        aria-label="EduNova home"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-950 text-xs font-black text-yellow-200 shadow-lg shadow-blue-950/18 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-10 sm:w-10 sm:text-sm"
          aria-hidden="true"
        >
          EN
        </span>
        <span class="truncate text-xl font-black tracking-tight sm:text-2xl">EduNova</span>
      </a>

      <div class="hidden items-center rounded-full bg-blue-950/5 p-1 text-sm font-semibold lg:flex">
        {#each navLinks as link}
          <a
            href="/"
            class="rounded-full px-4 py-2.5 text-blue-950/72 transition-all duration-300 hover:bg-white hover:text-blue-950 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {link}
          </a>
        {/each}
      </div>

      <div class="flex items-center gap-3">
        <button
          class="hidden rounded-full bg-blue-950 px-5 py-3 text-sm font-bold text-sky-50 shadow-lg shadow-blue-950/16 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 lg:inline-flex"
        >
          Student Portal
        </button>

        <details class="group relative lg:hidden">
          <summary
            class="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-blue-950/10 bg-white text-blue-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 sm:h-12 sm:w-12 [&::-webkit-details-marker]:hidden"
            aria-label="Open navigation menu"
          >
            <span class="sr-only">Menu</span>
            <span class="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span class="h-0.5 rounded-full bg-blue-950 transition-transform duration-300 group-open:translate-y-2 group-open:rotate-45"></span>
              <span class="h-0.5 rounded-full bg-blue-950 transition-opacity duration-300 group-open:opacity-0"></span>
              <span class="h-0.5 rounded-full bg-blue-950 transition-transform duration-300 group-open:-translate-y-2 group-open:-rotate-45"></span>
            </span>
          </summary>

          <div class="fixed left-4 right-4 top-[4.5rem] rounded-[1.5rem] border border-blue-950/8 bg-[oklch(98%_0.01_235)] p-3 shadow-2xl shadow-blue-950/18 sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-80">
            <p class="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-wide text-blue-950/48">
              Navigate
            </p>

            <div class="grid gap-1 sm:grid-cols-2">
              {#each navLinks as link}
                <a
                  href="/"
                  class="min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold text-blue-950/76 transition-colors duration-300 hover:bg-blue-950/6 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  {link}
                </a>
              {/each}
            </div>

            <button
              class="mt-3 min-h-12 w-full rounded-full bg-blue-950 px-5 text-sm font-bold text-sky-50 transition-all duration-300 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900"
            >
              Student Portal
            </button>
          </div>
        </details>
      </div>
    </div>
  </nav>

  <section
    class="relative overflow-hidden bg-[oklch(26%_0.09_255)] px-4 pt-28 pb-16 text-white sm:px-6 sm:pt-40 sm:pb-20 lg:pb-24"
  >
    <div
      class="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sky-400/30 to-transparent"
    ></div>
    <div
      class="absolute -right-28 top-24 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl"
    ></div>
    <div
      class="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-sky-300/15 blur-3xl"
    ></div>

    <div
      class="relative mx-auto grid max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center"
    >
      <div>
        <p
          class="inline-flex max-w-full items-center rounded-full bg-sky-100/12 px-3.5 py-2 text-sm font-semibold leading-5 text-sky-100 ring-1 ring-sky-100/20 sm:px-4"
        >
          Admissions open for the 2026 school year
        </p>

        <h1
          class="mt-6 max-w-4xl text-4xl font-black leading-[1.02] text-balance sm:mt-7 sm:text-6xl sm:leading-[0.96] lg:text-7xl"
        >
          A sharper school day for curious minds
        </h1>

        <p class="mt-5 max-w-2xl text-base leading-7 text-sky-50/86 sm:mt-7 sm:text-xl sm:leading-8">
          EduNova pairs rigorous academics with labs, arts, sport, and
          mentorship so students learn by building, questioning, and leading.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <button
            class="min-h-12 rounded-full bg-yellow-300 px-8 py-3.5 font-bold text-blue-950 shadow-xl shadow-blue-950/25 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200 sm:py-4"
          >
            Start Enrollment
          </button>

          <button
            class="min-h-12 rounded-full border border-sky-100/30 px-8 py-3.5 font-semibold text-sky-50 transition-all duration-300 hover:-translate-y-1 hover:border-sky-50 hover:bg-sky-50 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-100 sm:py-4"
          >
            View Programs
          </button>
        </div>

        <div
          class="mt-9 grid max-w-2xl grid-cols-3 gap-3 border-t border-sky-100/18 pt-6 sm:mt-12 sm:gap-6 sm:pt-8"
        >
          <div>
            <p class="text-2xl font-black text-yellow-200 sm:text-3xl">2,500+</p>
            <p class="mt-1 text-xs font-medium leading-5 text-sky-100/80 sm:text-sm">
              Active students
            </p>
          </div>

          <div>
            <p class="text-2xl font-black text-yellow-200 sm:text-3xl">120+</p>
            <p class="mt-1 text-xs font-medium leading-5 text-sky-100/80 sm:text-sm">
              Faculty mentors
            </p>
          </div>

          <div>
            <p class="text-2xl font-black text-yellow-200 sm:text-3xl">98%</p>
            <p class="mt-1 text-xs font-medium leading-5 text-sky-100/80 sm:text-sm">
              Graduation rate
            </p>
          </div>
        </div>
      </div>

      <div class="relative sm:min-h-[500px] lg:min-h-[560px]">
        <div
          class="absolute inset-x-5 top-8 bottom-0 hidden rounded-[2rem] bg-sky-300/16 sm:block"
        ></div>

        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
          alt="EduNova students working together at a campus table"
          class="relative h-76 w-full rounded-[1.5rem] object-cover shadow-2xl shadow-blue-950/40 sm:h-[500px] sm:rounded-[2rem] lg:h-[560px]"
        />

        <div
          class="relative -mt-8 mx-3 rounded-3xl bg-[oklch(97%_0.02_94)] p-4 text-blue-950 shadow-2xl shadow-blue-950/25 sm:absolute sm:left-8 sm:right-auto sm:bottom-4 sm:mx-0 sm:mt-0 sm:max-w-xs sm:p-5"
        >
          <p class="text-sm font-bold text-sky-700">This week on campus</p>
          <p class="mt-2 text-xl font-black leading-tight sm:text-2xl">
            Innovation seminar with student-built prototypes.
          </p>
        </div>
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
            <h3 class="text-2xl font-bold text-blue-900 mb-4">
              {program.title}
            </h3>

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
          Students can develop creativity, leadership, and teamwork beyond the
          classroom.
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
              <h3 class="text-xl font-bold text-blue-900 mb-3">
                {event.title}
              </h3>

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
          <h2 class="text-4xl font-black text-blue-950">School News & Blog</h2>

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
              <h3 class="text-2xl font-bold text-blue-900 mb-4">
                {post.title}
              </h3>

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

  <section
    class="relative overflow-hidden px-6 py-24 bg-[oklch(96%_0.018_235)]"
  >
    <div
      class="absolute left-1/2 top-0 h-48 w-[42rem] -translate-x-1/2 rounded-full bg-sky-300/30 blur-3xl"
    ></div>

    <div
      class="relative max-w-7xl mx-auto overflow-hidden rounded-[2rem] bg-[oklch(26%_0.09_255)] text-white shadow-2xl shadow-blue-950/20"
    >
      <div class="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_0.72fr] lg:p-12">
        <div>
          <p class="text-sm font-bold uppercase tracking-wide text-yellow-200">
            Admissions 2026
          </p>

          <h2
            class="mt-5 max-w-3xl text-4xl font-black leading-tight text-balance sm:text-5xl"
          >
            Find the right path before the first bell rings.
          </h2>

          <p class="mt-5 max-w-2xl text-lg leading-8 text-sky-50/82">
            Meet the admissions team, tour the labs and studios, and map the
            program mix that fits your student.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              class="rounded-full bg-yellow-300 px-8 py-4 font-bold text-blue-950 shadow-xl shadow-blue-950/25 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
            >
              Apply for 2026
            </button>

            <button
              class="rounded-full border border-sky-100/30 px-8 py-4 font-semibold text-sky-50 transition-all duration-300 hover:-translate-y-1 hover:border-sky-50 hover:bg-sky-50 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-100"
            >
              Book a Campus Tour
            </button>
          </div>
        </div>

        <div class="rounded-[1.5rem] bg-sky-50/8 p-6 ring-1 ring-sky-50/14">
          <p class="text-sm font-bold text-sky-100">Application timeline</p>

          <div class="mt-6 space-y-5">
            <div class="flex gap-4">
              <p
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-sm font-black text-blue-950"
              >
                1
              </p>
              <div>
                <h3 class="font-bold">Submit interest form</h3>
                <p class="mt-1 text-sm leading-6 text-sky-100/75">
                  Share student details and preferred program track.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <p
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-sm font-black text-blue-950"
              >
                2
              </p>
              <div>
                <h3 class="font-bold">Visit campus</h3>
                <p class="mt-1 text-sm leading-6 text-sky-100/75">
                  Tour classrooms, labs, studios, and activity spaces.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <p
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-sm font-black text-blue-950"
              >
                3
              </p>
              <div>
                <h3 class="font-bold">Confirm placement</h3>
                <p class="mt-1 text-sm leading-6 text-sky-100/75">
                  Finalize enrollment with the admissions counselor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-[oklch(20%_0.075_255)] px-6 pt-18 pb-8 text-white">
    <div class="max-w-7xl mx-auto">
      <div
        class="grid gap-10 border-b border-sky-100/12 pb-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]"
      >
        <div>
          <h3 class="text-3xl font-black">EduNova</h3>

          <p class="mt-5 max-w-sm leading-7 text-sky-100/78">
            A modern school for academic depth, creative confidence, and
            practical leadership.
          </p>

          <p class="mt-6 text-sm font-semibold text-yellow-200">
            Jakarta, Indonesia
          </p>
        </div>

        <div>
          <h4 class="font-bold text-sky-50">Explore</h4>

          <div class="mt-5 flex flex-col gap-3 text-sky-100/78">
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="/">Programs</a
            >
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="/">Admissions</a
            >
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="/">Events</a
            >
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="/">Gallery</a
            >
          </div>
        </div>

        <div>
          <h4 class="font-bold text-sky-50">Contact</h4>

          <div class="mt-5 flex flex-col gap-3 text-sky-100/78">
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="mailto:info@edunova.edu">info@edunova.edu</a
            >
            <a
              class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
              href="tel:+6281234567890">+62 812 3456 7890</a
            >
            <p>Mon to Fri, 08:00 to 16:00</p>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-sky-50">Admissions Notes</h4>

          <p class="mt-5 text-sm leading-6 text-sky-100/78">
            Monthly updates on open houses, scholarship dates, and student
            showcases.
          </p>

          <form
            class="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
          >
            <label class="sr-only" for="footer-email">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Email address"
              class="min-h-12 w-full rounded-full border border-sky-100/14 bg-sky-50/10 px-5 text-sky-50 placeholder:text-sky-100/50 outline-none transition-colors duration-300 focus:border-yellow-200 focus:bg-sky-50/14"
            />

            <button
              class="min-h-12 rounded-full bg-yellow-300 px-6 font-bold text-blue-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 pt-8 text-sm text-sky-100/62 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>Copyright 2026 EduNova. All rights reserved.</p>

        <div class="flex gap-5">
          <a
            class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
            href="/">Privacy</a
          >
          <a
            class="transition-colors duration-300 hover:text-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
            href="/">Terms</a
          >
        </div>
      </div>
    </div>
  </footer>
</div>

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
