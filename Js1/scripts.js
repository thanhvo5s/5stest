// Lấy canvas
        const canvas = document.getElementById('background');
        const ctx = canvas.getContext('2d');

        // Cập nhật kích thước canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Mảng lưu trữ các hạt
        let particles = [];

        // Tạo đối tượng hạt
        class Particle {
            constructor(x, y, size, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.color = color;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.size *= 0.95; // Giảm kích thước theo thời gian
                if (this.size < 0.5) return false;
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Gradient nền
        let hue = 0;
        function animateBackground() {
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            hue += 1;
            if (hue > 360) hue = 0;

            // Cập nhật và vẽ hạt
            particles = particles.filter(particle => particle.update());
            particles.forEach(particle => particle.draw());

            requestAnimationFrame(animateBackground);
        }

        // Thêm hạt khi nhấn nút
        function addParticle() {
            for (let i = 0; i < 200; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 10 + 5;
                const speedX = (Math.random() - 0.5) * 4;
                const speedY = (Math.random() - 0.5) * 4;
                const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                particles.push(new Particle(x, y, size, speedX, speedY, color));
            }
        }

        // Thay đổi màu nền ngẫu nhiên
        function changeColor() {
            hue = Math.random() * 360;
        }

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Bắt đầu animation
        animateBackground();