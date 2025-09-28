// Output variable mappings
const OUTPUT_DISPLAY_NAMES = {
    'cost_t': 'Cost',
    'bps_mean_t': 'Mean Blood Pressure',
    'gagne_sum_t': 'Gagne Comorbidity Score',
    'ldl_mean_t': 'Mean LDL Level',
    'risk_score_t': 'Risk Score'
};

// Utility function to get display name
function getOutputDisplayName(variableName) {
    return OUTPUT_DISPLAY_NAMES[variableName] || variableName;
}