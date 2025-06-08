import React from 'react';

function ContactWidget({phone, email, addressLine1, addressLine2}) {
    return (
            <div
                id="contact-info"
                className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl w-full space-y-8"
            >
                <h2 className="text-3xl font-bold text-center text-blue-700">Contact Us</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        {phone && (
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Phone</p>
                                <p className="text-gray-600">{phone}</p>
                            </div>
                        )}

                        {email && (
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Email</p>
                                <p className="text-gray-600">{email}</p>
                            </div>
                        )}

                        {(addressLine1 || addressLine2) && (
                            <div>
                                <p className="text-lg font-semibold text-gray-700">Address</p>
                                <p className="text-gray-600">
                                    {addressLine1}
                                    <br/>
                                    {addressLine2}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Google Map */}
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21863.74782004711!2d23.6028535!3d46.7655178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c3f28c54ffb%3A0xf43262cec8ad637f!2sStomarix!5e0!3m2!1sen!2sro!4v1749222561860!5m2!1sen!2sro"
                            className="w-full h-64 rounded-xl border"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
    );
}

export default ContactWidget;
