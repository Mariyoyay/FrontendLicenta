import React from 'react';
import PageWithTopAndSideBar from "./PageWithTopAndSideBar.jsx";

export default function PrivacyPolicyPage() {
    return (
        <PageWithTopAndSideBar>
            <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 lg:px-32">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
                    <p className="mb-8 text-center text-gray-600">Effective date: June 6, 2025</p>

                    <div className="space-y-8 leading-relaxed text-lg">
                        <section>
                            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                            <p>
                                We respect your privacy and are committed to protecting it through our compliance with this policy.
                                This Privacy Policy explains how we collect, use, and disclose your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                            <p>
                                We may collect personal information such as your name, email address, phone number, and usage data when
                                you use our application or interact with our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                            <p>
                                We use the collected information to provide and improve our services, respond to inquiries, and ensure the security of our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
                            <p>
                                We do not sell your personal information. We may share it with third parties only to provide services on our behalf or to comply with legal obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to safeguard your personal information from unauthorized access and misuse.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
                            <p>
                                You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
                            <p>
                                We may update this policy from time to time. When we do, we will revise the "Effective date" at the top.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <strong>Email:</strong> privacy@example.com<br />
                                <strong>Phone:</strong> +1 (234) 567-8901
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </PageWithTopAndSideBar>
    );
}
