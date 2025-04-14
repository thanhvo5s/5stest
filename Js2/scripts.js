const canvas = document.getElementById('starryCanvas');
        const ctx = canvas.getContext('2d');

        // Cập nhật kích thước canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Mảng lưu trữ ngôi sao
        let stars = [];

        // Lớp Star
        class Star {
            constructor(x, y, radius, speedX, speedY, opacity) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.speedX = speedX;
                this.speedY = speedY;
                this.opacity = opacity;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.002;
                if (this.opacity <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    return false;
                }
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffffff';
                ctx.fill();
            }
        }

        // Thêm ngôi sao
        function addStars() {
            for (let i = 0; i < 10; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 2 + 1;
                const speedX = (Math.random() - 0.5) * 2;
                const speedY = (Math.random() - 0.5) * 2;
                const opacity = Math.random() * 0.5 + 0.5;
                stars.push(new Star(x, y, radius, speedX, speedY, opacity));
            }
        }

        // Animation loop
        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars = stars.filter(star => star.update());
            stars.forEach(star => star.draw());
            requestAnimationFrame(animateStars);
        }

        // Xử lý hiệu ứng ripple
        function triggerRipple(e) {
            const button = e.target;
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x - 50}px`; // Điều chỉnh để căn giữa vòng tròn
            ripple.style.top = `${y - 50}px`; // Điều chỉnh để căn giữa vòng tròn
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }

        // Gắn sự kiện ripple cho tất cả nút
        const buttons = document.querySelectorAll('.ripple-btn');
        buttons.forEach(button => {
            button.addEventListener('click', triggerRipple);
        });

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Bắt đầu animation
        animateStars();
        addStars(); // Thêm vài ngôi sao ban đầu