// data = { totalPresent, totalAbsent, totalStudents }
export const calculate = (data) => {
    if (!data) return 0;

    const totalPresent = data.totalPresent || 0;
    const totalStudents = data.totalStudents || 0;

    const percentage = totalStudents === 0 ? 0 : Math.round((totalPresent / totalStudents) * 100);
    return percentage;
};
