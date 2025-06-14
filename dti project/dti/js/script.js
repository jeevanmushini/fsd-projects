document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname;

    // If not logged in and not on login/register page, redirect to login
    if (!isLoggedIn && !currentPage.includes('login.html') && !currentPage.includes('register.html')) {
        window.location.href = '../html/login.html';
        return; // Stop further execution
    }

    // Sample event data
    const events = [
        {
            id: 1,
            title: "HackTheFuture 2023",
            college: "IIT Bombay",
            date: "Nov 15-17, 2023",
            description: "Annual hackathon with prizes worth ₹5 lakhs. Open to all college students.",
            image: "https://www.adwise.nl/static/shared/media/cache/hack%20the%20future%20with%20AI.da266d678814cfb641a1ec1238b83201.jpg",
            registered: 1250
        },
        {
            id: 2,
            title: "TechFest International",
            college: "IIIT Hyderabad",
            date: "Dec 5-8, 2023",
            description: "Asia's largest science and technology festival with workshops and competitions.",
            image: "https://www.munich-startup.de/wp-content/uploads/2017/07/Teaser_Techfest_small.jpeg",
            registered: 3200
        },
        {
            id: 3,
            title: "CodeWars 2023",
            college: "BITS Pilani",
            date: "Jan 10-12, 2024",
            description: "Competitive programming challenge with individual and team categories.",
            image: "https://academichelp.net/wp-content/uploads/2023/06/Codewars.png",
            registered: 870
        },
        {
            id: 4,
            title: "InnovateX",
            college: "NIT Trichy",
            date: "Feb 20-22, 2024",
            description: "Innovation challenge for startups and student projects with funding opportunities.",
            image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1687236390011/86850bd1-5dc6-409f-abdb-db3edb03f42c.webp?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
            registered: 540
        },
        {
            id: 5,
            title: "AI Summit",
            college: "IISc Bangalore",
            date: "Mar 8-10, 2024",
            description: "Artificial Intelligence conference and hackathon with industry leaders.",
            image: "https://gatherverse.org/wp-content/uploads/2023/01/GatherVerse-AI-Summit-Banner.jpg",
            registered: 2100
        },
        {
            id: 6,
            title: "CyberSec Challenge",
            college: "DTU Delhi",
            date: "Apr 5-7, 2024",
            description: "Cybersecurity competition with CTF and workshops by experts.",
            image: "https://www.segurilatam.com/wp-content/uploads/sites/5/2022/10/cybersec-challenge-2022.jpg",
            registered: 680
        }
    ];

    // Load events into the grid (only if on main page and logged in)
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid && isLoggedIn) {
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}')"></div>
                <div class="event-details">
                    <span class="event-date">${event.date}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-college">
                        <i class="fas fa-university"></i>
                        <span>${event.college}</span>
                    </div>
                    <p class="event-desc">${event.description}</p>
                    <div class="event-actions">
                        <span><i class="fas fa-users"></i> ${event.registered} registered</span>
                        <a href="https://iieciitgn.com/hackthefuture/" class="btn">Details</a>
                    </div>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    }

    // Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeBtns = document.querySelectorAll('.close');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
            const password = document.getElementById('loginPassword')?.value.trim();
    
            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }
    
            // Correct common email typos or missing parts (example: fix missing dot in gmail.com)
            email = email.replace('gmailcom', 'gmail.com');
    
            const users = JSON.parse(localStorage.getItem('users')) || [];
    
            console.log('Login attempt:', { email, password, users }); // Debug
    
            // Find the user with the corrected email
            const user = users.find(user => user.email.toLowerCase() === email && user.password === password);
    
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                window.location.href = '../html/index.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
    
    

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail')?.value.trim().toLowerCase();
            const password = document.getElementById('registerPassword')?.value.trim();

            if (!email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const exists = users.some(user => user.email === email);

            if (exists) {
                alert('User already exists!');
            } else {
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));
                console.log('Registered users:', JSON.parse(localStorage.getItem('users'))); // Debug
                alert('Registration successful! Please log in.');
                registerModal.style.display = 'none';
                loginModal.style.display = 'block';
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive updates about upcoming events.`);
            newsletterForm.reset();
        });
    }

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Optional: Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            alert('Logged out successfully!');
            window.location.href = '../html/login.html';
        });
    }
});

// Navigation redirections (ensure login check)
const navLinks = [
    { id: 'events', href: '../html/events.html' },
    { id: 'colleges', href: '../html/colleges.html' },
    { id: 'contact', href: '../html/contact.html' },
    { id: 'about', href: '../html/about.html' }
];

navLinks.forEach(link => {
    const element = document.getElementById(link.id);
    if (element) {
        element.addEventListener('click', function () {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                window.location.href = link.href;
            } else {
                alert('Please log in to access this page.');
                window.location.href = '../html/login.html';
            }
        });
    }
});

// Login and Register buttons don't need login check
document.getElementById('loginBtn')?.addEventListener('click', function () {
    window.location.href = '../html/login.html';
});
document.getElementById('registerBtn')?.addEventListener('click', function () {
    window.location.href = '../html/register.html';
});
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // College URLs (can be expanded with more colleges and their URLs)
    const colleges = {
        "IIT Delhi": "https://www.iitd.ac.in",
        "IIT Bombay": "https://www.iitb.ac.in",
        "NIT Trichy": "https://www.nitt.edu",
        "NIT Warangal": "https://www.nitw.ac.in",
        "BITS Pilani": "https://www.bits-pilani.ac.in",
        // Add more colleges here
    };

    // Function to handle search
    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value.trim();

        if (!searchQuery) {
            alert("Please enter a search term.");
            return;
        }

        // Normalize search query to match college names
        const collegeUrl = colleges[searchQuery];

        if (collegeUrl) {
            window.location.href = collegeUrl; // Redirect to the college's webpage
        } else {
            alert("Sorry, no matching college found. Please try again.");
        }
    });
});
const resultText = document.getElementById('searchResultText');

// Function to handle search
searchButton.addEventListener('click', function () {
    const searchQuery = searchInput.value.trim();

    if (!searchQuery) {
        alert("Please enter a search term.");
        return;
    }

    // Normalize search query to match college names
    const collegeUrl = colleges[searchQuery];

    if (collegeUrl) {
        // Show the college name and redirect after 3 seconds
        resultText.style.display = 'block';
        resultText.textContent = `Redirecting to ${searchQuery}...`;

        setTimeout(() => {
            window.location.href = collegeUrl; // Redirect to the college's webpage
        }, 3000); // Wait 3 seconds before redirecting
    } else {
        alert("Sorry, no matching college found. Please try again.");
    }
});
