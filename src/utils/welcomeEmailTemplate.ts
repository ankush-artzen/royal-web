export function getWelcomeEmailTemplate(email: string, royalId: string, year: number) {
  const user = email.split("@")[0];
  return `
    <div style="
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    ">
      <!-- Header with Crown Icon -->
      <div style="
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 40px 32px;
        text-align: center;
        color: white;
        position: relative;
      ">
        <div style="
          font-size: 48px;
          margin-bottom: 16px;
        ">👑</div>
        <h1 style="
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
        ">Welcome to Royal Portal</h1>
        <p style="
          margin: 8px 0 0 0;
          opacity: 0.9;
          font-size: 18px;
          font-weight: 300;
        ">Your royal journey begins here</p>
      </div>

      <!-- Main Content -->
      <div style="
        background: white;
        padding: 48px 40px;
      ">
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="
            margin: 0 0 16px 0;
            color: #2d3748;
            font-size: 28px;
            font-weight: 600;
          ">
            Welcome aboard, <span style="color: #764ba2;">${user}!</span>
          </h2>
          <p style="
            margin: 0;
            color: #718096;
            font-size: 18px;
            line-height: 1.6;
          ">
            We're absolutely thrilled to welcome you to the <strong style="color: #764ba2;">Royal Portal</strong> family.
          </p>
        </div>

        <!-- Credentials Card -->
        <div style="
          background: #f8f9ff;
          border-radius: 12px;
          padding: 32px;
          border: 2px solid #e9ecef;
          margin-bottom: 32px;
        ">
          <h3 style="
            margin: 0 0 20px 0;
            color: #2d3748;
            font-size: 20px;
            font-weight: 600;
            text-align: center;
          ">Your Royal Credentials</h3>
          
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="
              display: flex;
              align-items: center;
              background: white;
              padding: 16px 20px;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            ">
              <div style="
                background: #667eea;
                color: white;
                padding: 8px;
                border-radius: 6px;
                margin-right: 12px;
              ">📧</div>
              <div>
                <div style="font-size: 14px; color: #718096; font-weight: 500;">Email</div>
                <div style="font-size: 16px; color: #2d3748; font-weight: 600;">${email}</div>
              </div>
            </div>
            
            <div style="
              display: flex;
              align-items: center;
              background: white;
              padding: 16px 20px;
              border-radius: 8px;
              border-left: 4px solid #764ba2;
            ">
              <div style="
                background: #764ba2;
                color: white;
                padding: 8px;
                border-radius: 6px;
                margin-right: 12px;
              ">🆔</div>
              <div>
                <div style="font-size: 14px; color: #718096; font-weight: 500;">Royal ID</div>
                <div style="font-size: 16px; color: #2d3748; font-weight: 600; letter-spacing: 1px;">${royalId}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div style="text-align: center; margin: 40px 0;">
          <p style="
            margin: 0 0 20px 0;
            color: #718096;
            font-size: 16px;
          ">
            Ready to begin your royal experience?
          </p>
          <a href="https://royalapp-web.vercel.app/login" style="
            display: inline-block;
            padding: 18px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 18px;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(102, 126, 234, 0.5)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(102, 126, 234, 0.4)';">
            🚀 Access Your Portal
          </a>
        </div>

        <!-- Policies -->
        <div style="
          text-align: center;
          padding: 24px;
          background: #f7fafc;
          border-radius: 8px;
          margin: 32px 0;
        ">
          <p style="
            margin: 0 0 12px 0;
            color: #718096;
            font-size: 14px;
          ">
            By creating your account, you agree to our
          </p>
          <div style="display: flex; justify-content: center; gap: 24px;">
            <a href="https://royalapp-web.vercel.app/policies/conditions" style="
              color: #667eea;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              transition: color 0.3s ease;
            " onmouseover="this.style.color='#764ba2';" onmouseout="this.style.color='#667eea';">
              📜 Terms of Service
            </a>
            <a href="https://royalapp-web.vercel.app/policies/privacy-policy" style="
              color: #667eea;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              transition: color 0.3s ease;
            " onmouseover="this.style.color='#764ba2';" onmouseout="this.style.color='#667eea';">
              🔒 Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 24px 32px;
        text-align: center;
        color: white;
      ">
        <p style="
          margin: 0 0 8px 0;
          font-size: 14px;
          opacity: 0.8;
        ">
          Need assistance? Our royal support team is here to help.
        </p>
        <p style="
          margin: 0;
          font-size: 12px;
          opacity: 0.6;
        ">
          © ${year} Royal Portal. All rights reserved.
        </p>
      </div>
    </div>
  `;
}
