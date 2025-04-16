const canvas = document.getElementById('stageCanvas');
        const ctx = canvas.getContext('2d');

        // Cập nhật kích thước canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Biến điều khiển
        let particles = [];
        let beatIntensity = 0.5;
        let hue = 0;
        const bars = 100; // Số cột ánh sáng

        // Lớp Particle
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 6 + 3;
                this.speedX = (Math.random() - 0.5) * 8;
                this.speedY = (Math.random() - 0.5) * 8;
                this.opacity = 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.03;
                if (this.opacity <= 0) return false;
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${this.opacity})`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
                ctx.fill();
            }
        }

        // Tạo hạt khi nhấn chuột
        canvas.addEventListener('click', (e) => {
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        });

        // Tăng nhịp
        function boostBeat() {
            beatIntensity += 0.2;
            if (beatIntensity > 2) beatIntensity = 2;
        }

        // Đổi màu
        function changeColor() {
            hue = Math.random() * 360;
        }

        // Vẽ sân khấu
        function animateStage() {
            // Nền gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, `hsl(${hue}, 100%, 20%)`);
            gradient.addColorStop(1, `hsl(${hue + 60}, 100%, 10%)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Vẽ cột ánh sáng
            const barWidth = canvas.width / bars;
            for (let i = 0; i < bars; i++) {
                const height = (Math.sin(Date.now() * 0.002 + i * 0.5) * 0.5 + 0.5) * canvas.height * 0.6 * beatIntensity;
                ctx.fillStyle = `hsla(${hue + i * 10}, 100%, 60%, 0.8)`;
                ctx.shadowBlur = 20;
                ctx.shadowColor = `hsl(${hue + i * 10}, 100%, 50%)`;
                ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 10, height);
            }

            // Cập nhật và vẽ hạt
            particles = particles.filter(p => p.update());
            particles.forEach(p => p.draw());

            requestAnimationFrame(animateStage);
        }

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Bắt đầu animation
        animateStage();