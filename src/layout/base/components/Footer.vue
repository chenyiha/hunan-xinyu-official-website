<template>
  <div class="website-footer">
    <div class="footer-content">
      <!-- Footer Top -->
      <div class="footer-top">
        <div class="footer-section">
          <h4>{{ $t('footer.copyright') }}</h4>
          <p class="footer-text">© 2026 All Rights Reserved.</p>
        </div>

        <div class="footer-section">
          <h4>{{ $t('footer.links') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/about/profile">{{ $t('about.profile') }}</router-link></li>
            <li><router-link to="/products">{{ $t('nav.products') }}</router-link></li>
            <li><router-link to="/solutions">{{ $t('nav.solutions') }}</router-link></li>
            <li><router-link to="/contact">{{ $t('nav.contact') }}</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>{{ $t('footer.sitemap') }}</h4>
          <ul class="footer-links">
            <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li><router-link to="/news">{{ $t('nav.news') }}</router-link></li>
            <li><router-link to="/tech">{{ $t('nav.tech') }}</router-link></li>
            <li><router-link to="/about/certification">{{ $t('about.certification') }}</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>{{ $t('footer.social') }}</h4>
          <div class="social-icons">
            <a href="#" class="social-icon" title="WeChat">
              <svg-icon icon-class="gitee" />
            </a>
            <a href="#" class="social-icon" title="LinkedIn">
              <el-icon><link /></el-icon>
            </a>
            <a href="#" class="social-icon" title="Email">
              <svg-icon icon-class="email" />
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <router-link to="/privacy" class="footer-link">{{ $t('footer.privacy') }}</router-link>
        <span class="separator">|</span>
        <router-link to="/sitemap" class="footer-link">{{ $t('footer.sitemap') }}</router-link>
        <span class="separator">|</span>
        <span class="copyright-text">© 2026 Company Name. All rights reserved.</span>
      </div>
    </div>

    <!-- Back to Top Button -->
    <el-backtop :right="40" :bottom="40" :visibility-height="300">
      <div class="back-top-button">
        <el-icon><top /></el-icon>
      </div>
    </el-backtop>
  </div>
</template>

<script setup name="WebsiteFooter">
import { Link, Top } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.website-footer {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 40px 0 20px;

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .footer-top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-section {
    h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #ffffff;
    }

    .footer-text {
      font-size: 14px;
      color: #a8abb2;
      line-height: 1.6;
    }

    .footer-links {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 12px;

        a {
          color: #a8abb2;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s;

          &:hover {
            color: var(--el-color-primary-light-3);
          }
        }
      }
    }

    .social-icons {
      display: flex;
      gap: 16px;

      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #2c2c2c;
        border-radius: 4px;
        color: #a8abb2;
        transition: all 0.3s;

        &:hover {
          background-color: var(--el-color-primary);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .el-icon {
          font-size: 18px;
        }

        :deep(.svg-icon) {
          font-size: 18px;
        }
      }
    }
  }

  .footer-bottom {
    padding-top: 30px;
    border-top: 1px solid #2c2c2c;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    .footer-link {
      color: #a8abb2;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;

      &:hover {
        color: var(--el-color-primary-light-3);
      }
    }

    .separator {
      color: #2c2c2c;
      font-size: 14px;
    }

    .copyright-text {
      color: #a8abb2;
      font-size: 14px;
      flex: 1;
      text-align: right;
    }
  }

  .back-top-button {
    background-color: var(--el-color-primary);
    color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;

    &:hover {
      background-color: var(--el-color-primary-light-3);
      transform: translateY(-2px);
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .website-footer {
    .footer-content {
      padding: 0 20px;
    }

    .footer-top {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 12px;

      .copyright-text {
        text-align: center;
      }
    }
  }
}

@media (max-width: 640px) {
  .website-footer {
    padding: 30px 0 15px;

    .footer-top {
      grid-template-columns: 1fr;
      gap: 25px;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .separator {
        display: none;
      }

      .copyright-text {
        text-align: center;
      }
    }
  }
}
</style>
